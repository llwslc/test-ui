#!/bin/sh
# kit-qa quick — 按改动范围挑门。全量 check.sh 仍是收官/验收线。
# 用法: sh quick.sh [base]   (默认对 HEAD 的未提交改动;可传 commit 比较)
cd "$(dirname "$0")/../../.." || exit 2
BASE=${1:-HEAD}
FILES=$( { git diff --name-only "$BASE"; git diff --name-only --cached "$BASE"; } | sort -u )
[ -z "$FILES" ] && { echo "无改动 vs $BASE"; exit 0; }
echo "改动文件:"; echo "$FILES" | sed 's/^/  /'

has() { echo "$FILES" | grep -Eq "$1"; }
RUN=""; SKIP_NOTE=""

has '^prompt/' && RUN="$RUN prompt-lint theme-doc-sync"
RUN="$RUN eslint format-check"
if has '\.tsx?$'; then
  RUN="$RUN tsc kit-api kit-structure kit-naming kit-deadcode kit-demo-states fingerprint"
fi
if has 'src/kits/.*\.css$'; then
  RUN="$RUN kit-lint kit-deadcode kit-structure kit-visual fingerprint"
  SKIP_NOTE="css 改动只跑了 kit-visual 这一个动态门——弹层/动效/状态类改动请自点 kit-submenu-gap / kit-anim-sync / kit-states / kit-interact,收官跑全量 check.sh"
fi
RUN=$(echo "$RUN" | tr ' ' '\n' | sort -u | grep -v '^$')
echo; echo "选中的门:"; echo "$RUN" | sed 's/^/  /'; echo

fail=0
for g in $RUN; do
  case $g in
    tsc) npx tsc --noEmit >/tmp/kq-tsc.log 2>&1; rc=$?;;
    eslint) npm run lint >/tmp/kq-eslint.log 2>&1; rc=$?;;
    format-check) npm run format:check >/tmp/kq-format-check.log 2>&1; rc=$?;;
    prompt-lint) bash .claude/skills/prompt-lint/check.sh >/tmp/kq-$g.log 2>&1; rc=$?;;
    kit-lint) : >/tmp/kq-$g.log; for k in src/kits/*/; do k=$(basename "$k"); bash .claude/skills/kit-lint/check.sh "$k" >>/tmp/kq-$g.log 2>&1 || rc=1; done; rc=${rc:-0};;
    kit-visual) GATE_PORT=${GATE_PORT:-5273} node .claude/skills/$g/check.cjs >/tmp/kq-$g.log 2>&1; rc=$?;;
    fingerprint) GATE_PORT=${GATE_PORT:-5273} node .claude/skills/kit-qa/fingerprint.cjs >/tmp/kq-$g.log 2>&1; rc=$?; [ $rc != 0 ] && sed -n '1,12p' /tmp/kq-$g.log;;
    *) node .claude/skills/$g/check.cjs >/tmp/kq-$g.log 2>&1; rc=$?;;
  esac
  if [ "$rc" = 0 ]; then printf "  PASS  %s\n" "$g"; else printf "  FAIL  %s  (日志 /tmp/kq-%s.log)\n" "$g" "$g"; fail=1; fi
  rc=
done
[ -n "$SKIP_NOTE" ] && { echo; echo "注意: $SKIP_NOTE"; }
echo; [ $fail = 0 ] && echo "kit-qa quick: PASS(范围内)" || echo "kit-qa quick: FAIL"
exit $fail
