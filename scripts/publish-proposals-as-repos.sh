#!/usr/bin/env bash
set -euo pipefail

# Publish each documentation-only proposal as its own PUBLIC GitHub repository.
# Run this from a clone of dilshan-personal-portfolio after installing GitHub CLI.
# Requires: git, gh, and an authenticated GitHub account with repository-create permission.

OWNER="${GITHUB_OWNER:-dilshandevxx}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROPOSALS_DIR="$ROOT/project-proposals"

command -v gh >/dev/null 2>&1 || { echo "GitHub CLI (gh) is required."; exit 1; }
command -v git >/dev/null 2>&1 || { echo "Git is required."; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Authenticate first with: gh auth login"; exit 1; }

LOGIN="$(gh api user --jq .login)"
if [[ "$LOGIN" != "$OWNER" ]]; then
  echo "Authenticated as '$LOGIN' but OWNER is '$OWNER'. Set GITHUB_OWNER or authenticate as the intended account."
  exit 1
fi

created=0
skipped=0

for readme in "$PROPOSALS_DIR"/*/README.md; do
  [[ -f "$readme" ]] || continue
  slug="$(basename "$(dirname "$readme")")"
  repo="$OWNER/$slug"

  if gh repo view "$repo" >/dev/null 2>&1; then
    echo "SKIP: $repo already exists"
    ((skipped+=1))
    continue
  fi

  title="$(sed -n '1s/^# //p' "$readme")"
  description="Planned engineering project proposal: $title"
  workdir="$(mktemp -d)"
  cp "$readme" "$workdir/README.md"
  git -C "$workdir" init --initial-branch=main >/dev/null
  git -C "$workdir" config user.name "$LOGIN"
  USER_ID="$(gh api user --jq .id)"
  git -C "$workdir" config user.email "${USER_ID}+${LOGIN}@users.noreply.github.com"
  git -C "$workdir" add README.md
  git -C "$workdir" commit -m "docs: add project proposal README" >/dev/null

  echo "CREATE: $repo"
  gh repo create "$repo" --public --description "$description" --source "$workdir" --remote origin --push
  rm -rf "$workdir"
  ((created+=1))
done

echo "Finished. Created: $created | Skipped (already existed): $skipped"
