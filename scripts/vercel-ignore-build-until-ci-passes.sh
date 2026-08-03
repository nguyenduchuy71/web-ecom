#!/usr/bin/env bash
#
# Vercel `ignoreCommand` gate: only let a deploy build when GitHub Actions CI
# succeeded for this exact commit.
#
# Vercel's contract is inverted from normal exit codes:
#   exit 1 -> proceed with the build
#   exit 0 -> skip the build
#
# Requires a GITHUB_TOKEN env var in Vercel project settings (a fine-grained
# token with read-only "Checks" or "Actions" access to this repo).

set -uo pipefail

REPO="${GITHUB_REPO:-nguyenduchuy71/web-ecom}"
WORKFLOW_NAME="${CI_WORKFLOW_NAME:-CI}"
SHA="${VERCEL_GIT_COMMIT_SHA:-}"
MAX_ATTEMPTS="${CI_WAIT_ATTEMPTS:-40}"   # 40 x 15s = up to 10 minutes
SLEEP_SECONDS="${CI_WAIT_SLEEP:-15}"

proceed() { echo "→ BUILD: $1"; exit 1; }
skip()    { echo "→ SKIP:  $1"; exit 0; }

# Fail open on misconfiguration: a broken gate should not silently block all
# deploys. CI status stays visible on the commit either way.
[ -n "$SHA" ] || proceed "VERCEL_GIT_COMMIT_SHA unset; cannot check CI."
[ -n "${GITHUB_TOKEN:-}" ] || proceed "GITHUB_TOKEN unset; cannot check CI."

api="https://api.github.com/repos/${REPO}/actions/runs?head_sha=${SHA}&per_page=100"

for attempt in $(seq 1 "$MAX_ATTEMPTS"); do
  response="$(curl -sS \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "$api")" || proceed "GitHub API unreachable."

  # Pick the CI workflow run for this commit. No jq on Vercel's image, so use node.
  read -r status conclusion <<<"$(printf '%s' "$response" | node -e '
    let raw = "";
    process.stdin.on("data", (c) => (raw += c));
    process.stdin.on("end", () => {
      let runs = [];
      try { runs = (JSON.parse(raw).workflow_runs) || []; } catch { }
      const want = process.argv[1];
      const run = runs.filter((r) => r.name === want)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
      console.log(run ? `${run.status} ${run.conclusion ?? "null"}` : "missing null");
    });
  ' "$WORKFLOW_NAME")"

  case "$status" in
    completed)
      [ "$conclusion" = "success" ] \
        && proceed "CI succeeded for ${SHA:0:7}." \
        || skip "CI concluded '${conclusion}' for ${SHA:0:7}."
      ;;
    missing)
      # The run may not be registered yet; keep waiting before giving up.
      echo "CI run not found yet for ${SHA:0:7} (${attempt}/${MAX_ATTEMPTS})…"
      ;;
    *)
      echo "CI is '${status}' for ${SHA:0:7} (${attempt}/${MAX_ATTEMPTS})…"
      ;;
  esac

  sleep "$SLEEP_SECONDS"
done

skip "Timed out waiting for CI on ${SHA:0:7}; not deploying unverified code."
