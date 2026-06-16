#!/bin/sh
# diff-hygiene — flag added code comments + test cruft in the diff. See SKILL.md.
BASE="${1:-HEAD}"
DIFF=$(git diff -U0 "$BASE" -- '*.css' '*.ts' '*.tsx' '*.js' '*.cjs' 2>/dev/null)
[ -z "$DIFF" ] && { echo "diff-hygiene: no code changes vs $BASE"; exit 0; }

echo "$DIFF" | awk '
  /^\+\+\+ b\// { f=substr($0,7); skill=(f ~ /^\.claude\//); next }
  /^@@/ { match($0,/\+[0-9]+/); ln=substr($0,RSTART+1,RLENGTH-1)+0; next }
  /^-/ { next }
  /^\+/ {
    raw=substr($0,2); t=raw; sub(/^[ \t]*/,"",t)
    if (ln>2 && (t ~ /^\/\// || (t ~ /^\/\*/ && t !~ /\*\//)))
      { print "COMMENT  " f ":" ln "  " t; bad++ }
    else if (!skill && (raw ~ /console\.(log|debug|warn|error)/ || raw ~ /debugger/ \
          || raw ~ /(TODO|FIXME|XXX|HACK)/ || raw ~ /setTimeout\([^,]*,[ \t]*[0-9]/ || raw ~ /data-debug/))
      { print "CRUFT    " f ":" ln "  " t; bad++ }
    ln++; next
  }
  END { exit (bad>0?1:0) }
'
RC=$?
[ $RC -eq 0 ] && echo "diff-hygiene: clean vs $BASE" \
  || echo "
diff-hygiene: delete the above before committing (minimal-comments / no-test-cruft)"
exit $RC
