"""WikiClassroom — community courses: check a pull request, build and publish.

Used by the GitHub Actions in .github/workflows (it can also be run by hand):

    check    --repo=PR_CHECKOUT --base=SHA [--author=LOGIN] --out=work
             Checks every course a pull request touches with the trusted kit (the one
             of the base branch, where this script runs from), runs its exercise
             generators 400 times each, builds a preview ZIM and writes a Markdown
             report (work/report.md). Exit 1 if there are errors.
    plan     --out=work [--all]
             Compares community/ with the published community.json: which courses
             must be (re)built and which ones are retired (folder deleted or listed
             in community/retired.yaml).
    build    --out=work
             Builds the planned courses with kit/build.py (one ZIM each).
    publish  --out=work                       (needs GH_TOKEN with contents: write)
             Uploads the new ZIMs to the «community» release, writes community.json
             and removes the ZIMs nobody points to any more.

Only what is in community.json can be downloaded from Offlined, and community.json
is only written by «publish», which only runs on the main branch after a pull
request has been merged by the maintainer.
"""
from __future__ import annotations

import datetime as dt
import hashlib
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]          # the repository this script belongs to
TAG = "community"
REPO = os.environ.get("GITHUB_REPOSITORY", "Aruvaro-Chulvi/WikiClassroom")
JSON_URL = f"https://github.com/{REPO}/releases/download/{TAG}/community.json"
FOLDER_RX = re.compile(r"^community/([a-z]{2,3})/([a-z0-9_]{2,40}\.[a-z0-9_]{2,40})/")


def sh(*cmd, check=True, capture=True, env=None, cwd=None) -> str:
    r = subprocess.run(cmd, check=check, capture_output=capture, text=True, encoding="utf-8", env=env, cwd=cwd)
    return (r.stdout or "") if capture else ""


def opts() -> dict:
    return dict(a[2:].split("=", 1) if "=" in a else (a[2:], "1") for a in sys.argv[2:] if a.startswith("--"))


def source_sha(folder: Path) -> str:
    h = hashlib.sha256()
    for p in sorted(x for x in folder.rglob("*") if x.is_file()):
        h.update(p.relative_to(folder).as_posix().encode() + b"\0" + p.read_bytes() + b"\0")
    return h.hexdigest()


def load_published() -> dict:
    try:
        with urllib.request.urlopen(urllib.request.Request(JSON_URL, headers={"User-Agent": "WikiClassroom-CI"}), timeout=30) as r:
            return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return {"courses": [], "retired": []}
        raise


def retired_list(repo: Path) -> dict:
    """community/retired.yaml: [{id, lang, reason}] → {(lang, folder): reason}"""
    f = repo / "community" / "retired.yaml"
    if not f.exists():
        return {}
    import yaml
    out = {}
    for x in yaml.safe_load(f.read_text(encoding="utf-8")) or []:
        out[(str(x["lang"]), str(x["id"])[2:])] = str(x.get("reason") or "")
    return out


def build_course(kit: Path, folder: Path, out: Path) -> tuple[bool, str]:
    """Runs the generators test and builds the ZIM. (ok, log)"""
    lang, name = folder.parent.name, folder.name
    log = []
    env = dict(os.environ, WA_EXTRA_GEN=str(folder / "gen"))
    if (folder / "gen").is_dir():
        r = subprocess.run(["node", str(kit / "engine" / "samples.js"), lang, "--test", f"c.{name}."],
                           capture_output=True, text=True, encoding="utf-8", env=env)
        log.append("### Exercise generators (400 runs each)\n\n```\n" + (r.stdout + r.stderr).strip() + "\n```")
        if r.returncode:
            return False, "\n\n".join(log)
    r = subprocess.run([sys.executable, str(kit / "build.py"), f"--curso={folder}", f"--out={out}"],
                       capture_output=True, text=True, encoding="utf-8")
    tail = "\n".join(l for l in (r.stdout + r.stderr).splitlines()
                     if not re.match(r"^(Detect|Index|Set entry|Adding|Resolve|Sort|Create|Write|Search|Compress|Finish|Wait)", l))
    log.append("### Build\n\n```\n" + tail[-6000:].strip() + "\n```")
    return r.returncode == 0, "\n\n".join(log)


# ── check (pull request) ─────────────────────────────────────────────────
def cmd_check():
    o = opts()
    repo, out = Path(o["repo"]).resolve(), Path(o.get("out", "work")).resolve()
    kit = ROOT / "kit"
    sys.path.insert(0, str(kit))
    import community as com
    out.mkdir(parents=True, exist_ok=True)
    changed = [l for l in sh("git", "-C", str(repo), "diff", "--name-only", f"{o['base']}...HEAD").splitlines() if l.strip()]
    md, errors = ["# Community course check", ""], 0
    outside = [f for f in changed if not f.startswith("community/")]
    if outside:
        errors += 1
        md += ["## ❌ Files outside `community/`", "",
               "A course pull request may only change its own folder `community/<lang>/<author>.<course>/`. "
               "These files need a separate pull request (the maintainer reviews them on their own):", ""]
        md += [f"- `{f}`" for f in outside] + [""]
    touched = sorted({(m.group(1), m.group(2)) for f in changed if (m := FOLDER_RX.match(f))})
    other = [f for f in changed if f.startswith("community/") and not FOLDER_RX.match(f) and f != "community/retired.yaml"]
    if other:
        errors += 1
        md += ["## ❌ Files in the wrong place", "", "Courses go in `community/<lang>/<author>.<course>/`:", ""]
        md += [f"- `{f}`" for f in other] + [""]
    if len(touched) > 1:
        md += [f"> ℹ️ This pull request touches {len(touched)} courses. One course per pull request is easier to review.", ""]
    engine = set()
    for g in (kit / "engine" / "gen").glob("*.js"):
        engine |= set(re.findall(r'def\("([\w.]+)"', g.read_text(encoding="utf-8")))
    author = (o.get("author") or "").lower()
    for lang, name in touched:
        folder = repo / "community" / lang / name
        if not folder.is_dir():
            md += [f"## 🗑️ `{lang}/{name}` is deleted", "", "Merging this pull request **withdraws** the course: Offlined stops "
                   "serving it to everyone who installed it.", ""]
            continue
        rep = com.check_course(folder, lang, engine)
        md.append(com.report_md(rep))
        c = rep.info.get("course") or {}
        gh = str(c.get("github") or "").lower()
        was = subprocess.run(["git", "-C", str(repo), "cat-file", "-e", f"{o['base']}:community/{lang}/{name}/curso.yaml"],
                             capture_output=True).returncode == 0   # ¿ya estaba publicado en la rama base?
        if author and gh and gh != author:
            md += [f"> ⚠️ `curso.yaml` says the author is **@{gh}**, but this pull request is from **@{author}**."
                   + (" It changes **someone else's course**." if was else ""), ""]
        elif author and not gh:
            md += [f"> ℹ️ `curso.yaml` has no `github:` user (pull request by @{author}).", ""]
        if was:
            md += ["> ℹ️ This course is **already published**: merging publishes a new version that every user can update to.", ""]
        if rep.errors:
            errors += 1
            continue
        ok, log = build_course(kit, folder, out / name)
        md += [log, ""]
        if not ok:
            errors += 1
            md += ["**❌ The build failed.**", ""]
            continue
        titles = out / name / f"wikipedia_titles_{lang}.txt"
        if titles.exists() and titles.read_text(encoding="utf-8").strip():
            r = subprocess.run([sys.executable, str(kit / "verify_wikipedia.py"), lang, "--online", f"--out={out / name}"],
                               capture_output=True, text=True, encoding="utf-8")
            md += ["### Wikipedia links", "", "```", (r.stdout + r.stderr).strip()[-3000:], "```", ""]
        md += ["✅ **Preview:** download the `course-preview` artifact of this run; it has the ZIM (opens in Kiwix or in "
               "Offlined → WikiAula) and the `site_<lang>` folder (`python kit/preview.py <lang> 8092 <folder>`).", ""]
    if not touched and not outside and not other:
        md += ["Nothing to check (only `community/retired.yaml`)." if "community/retired.yaml" in changed else "No course changed.", ""]
    md += ["---", "", "**Before merging, the maintainer reviews by hand:** the content is accurate and suitable for students, "
           "nothing offensive or misleading, images and texts can be published under the course licence, and every line of "
           "`gen/*.js` only computes exercises (no network, no page access, nothing hidden).", ""]
    (out / "report.md").write_text("\n".join(md), encoding="utf-8")
    print("\n".join(md))
    sys.exit(1 if errors else 0)


# ── plan / build / publish (main branch) ─────────────────────────────────
def cmd_plan():
    o = opts()
    out = Path(o.get("out", "work")).resolve()
    out.mkdir(parents=True, exist_ok=True)
    pub = load_published()
    have = {(c["lang"], c["folder"]): c for c in pub.get("courses") or []}
    gone = retired_list(ROOT)
    disk = {(p.parent.parent.name, p.parent.name): p.parent for p in sorted((ROOT / "community").glob("*/*/curso.yaml"))}
    plan = {"build": [], "keep": [], "retire": []}
    for k, folder in disk.items():
        if k in gone:
            continue
        sha = source_sha(folder)
        commit = sh("git", "-C", str(ROOT), "log", "-1", "--format=%H", "--", str(folder.relative_to(ROOT))).strip()
        if "all" in o or k not in have or have[k].get("source_sha") != sha:
            plan["build"].append({"lang": k[0], "folder": k[1], "source_sha": sha, "commit": commit})
        else:
            plan["keep"].append(have[k])
    old_retired = {(r["lang"], r["id"][2:]): r for r in pub.get("retired") or []}
    for k in set(have) | set(gone) | set(old_retired):
        if k in disk and k not in gone:
            continue
        r = old_retired.get(k) or {"id": "c." + k[1], "lang": k[0], "date": dt.date.today().isoformat()}
        r["reason"] = gone.get(k, r.get("reason", ""))
        plan["retire"].append(r)
    (out / "plan.json").write_text(json.dumps(plan, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"build {len(plan['build'])} · keep {len(plan['keep'])} · retired {len(plan['retire'])}")
    for b in plan["build"]:
        print("  build", b["lang"], b["folder"])


def cmd_build():
    o = opts()
    out = Path(o.get("out", "work")).resolve()
    plan = json.loads((out / "plan.json").read_text(encoding="utf-8"))
    failed = []
    for b in plan["build"]:
        folder = ROOT / "community" / b["lang"] / b["folder"]
        ok, log = build_course(ROOT / "kit", folder, out / "courses" / b["folder"])
        print(log)
        if not ok:
            failed.append(b["folder"])
    if failed:
        sys.exit(f"Build failed: {', '.join(failed)} (nothing is published)")


def gh(*args, check=True) -> str:
    return sh("gh", *args, "--repo", REPO, check=check)


def cmd_publish():
    o = opts()
    out = Path(o.get("out", "work")).resolve()
    plan = json.loads((out / "plan.json").read_text(encoding="utf-8"))
    if subprocess.run(["gh", "release", "view", TAG, "--repo", REPO], capture_output=True).returncode:
        gh("release", "create", TAG, "--title", "Community courses · Cursos de la comunidad", "--prerelease", "--latest=false",
           "--notes", "WikiAula courses written by the community and reviewed before publication. Offlined reads "
                      "`community.json` from this release. · Cursos de WikiAula escritos por la comunidad y revisados antes "
                      "de publicarse. Offlined lee `community.json` de esta release.")
    courses = list(plan["keep"])
    for b in plan["build"]:
        cdir = out / "courses" / b["folder"]
        info = json.loads((cdir / "course.json").read_text(encoding="utf-8"))
        zim = next(cdir.glob(f"wikiaula-community_{b['lang']}_{b['folder']}_*.zim"))
        gh("release", "upload", TAG, str(zim), "--clobber")
        h = hashlib.sha256()
        with open(zim, "rb") as f:
            for chunk in iter(lambda: f.read(8 << 20), b""):
                h.update(chunk)
        pr = ""
        if b.get("commit"):
            pr = sh("gh", "api", f"repos/{REPO}/commits/{b['commit']}/pulls", "--jq", ".[0].html_url // \"\"", check=False).strip()
        courses = [c for c in courses if (c["lang"], c["folder"]) != (b["lang"], b["folder"])]
        courses.append(dict(info, file=zim.name, url=f"https://github.com/{REPO}/releases/download/{TAG}/{zim.name}",
                            size=zim.stat().st_size, sha256=h.hexdigest(), date=dt.date.today().isoformat(),
                            source_sha=b["source_sha"], commit=b.get("commit", ""), pr=pr))
    courses.sort(key=lambda c: (c["lang"], c["folder"]))
    data = {"name": "WikiClassroom community courses", "updated": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
            "courses": courses, "retired": sorted(plan["retire"], key=lambda r: (r["lang"], r["id"]))}
    cj = out / "community.json"
    cj.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    gh("release", "upload", TAG, str(cj), "--clobber")
    keep = {c["file"] for c in courses} | {"community.json"}
    assets = json.loads(gh("release", "view", TAG, "--json", "assets"))["assets"]
    for a in assets:
        if a["name"] not in keep:
            gh("release", "delete-asset", TAG, a["name"], "--yes")
            print("removed", a["name"])
    summary = [f"## Community courses published", "", f"{len(courses)} courses · {len(plan['retire'])} retired", ""]
    summary += [f"- {'🆕' if any(b['folder'] == c['folder'] for b in plan['build']) else '·'} `{c['lang']}/{c['folder']}` "
                f"{c['title']} — {c['file']}" for c in courses]
    summary += [f"- 🗑️ `{r['lang']}/{r['id']}` {r.get('reason', '')}" for r in plan["retire"]]
    if os.environ.get("GITHUB_STEP_SUMMARY"):
        Path(os.environ["GITHUB_STEP_SUMMARY"]).write_text("\n".join(summary) + "\n", encoding="utf-8")
    print("\n".join(summary))


if __name__ == "__main__":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    cmds = {"check": cmd_check, "plan": cmd_plan, "build": cmd_build, "publish": cmd_publish}
    if len(sys.argv) < 2 or sys.argv[1] not in cmds:
        print(__doc__)
        sys.exit(2)
    cmds[sys.argv[1]]()
