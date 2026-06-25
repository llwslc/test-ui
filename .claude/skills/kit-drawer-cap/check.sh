#!/bin/sh
# Drawer sliding-axis caps (各 kit 同值) must flow from shared --shell-drawer-{w,h}-cap,
# never a raw viewport % literal in a kit's Drawer.css. Mirrors kit-navmenu-colw.
fail=0
shared="src/shared/geometry.css"
for t in --shell-drawer-w-cap --shell-drawer-h-cap; do
  grep -q -- "$t:" "$shared" || { echo "  FAIL  $shared missing $t"; fail=1; }
done

for kdir in src/kits/*/; do
  kit=$(basename "$kdir")
  css="${kdir}components/Drawer/Drawer.css"
  tok="${kdir}theme/tokens.css"
  [ -f "$css" ] || continue
  kf=0
  for dim in w h; do
    grep -q -- "--${kit}-drawer-${dim}-cap: var(--shell-drawer-${dim}-cap)" "$tok" 2>/dev/null \
      || { echo "  FAIL  $kit: tokens.css missing alias --${kit}-drawer-${dim}-cap: var(--shell-drawer-${dim}-cap)"; kf=1; }
  done
  bad=$(grep -nE '(width|height): *min\(' "$css" | grep -E '[0-9]+%' | grep -v '100%')
  if [ -n "$bad" ]; then
    echo "  FAIL  $kit: Drawer min() hardcodes a viewport %:"; printf '%s\n' "$bad" | sed 's/^/          /'; kf=1
  fi
  grep -q -- "var(--${kit}-drawer-w-cap)" "$css" || { echo "  FAIL  $kit: width min() not using var(--${kit}-drawer-w-cap)"; kf=1; }
  grep -q -- "var(--${kit}-drawer-h-cap)" "$css" || { echo "  FAIL  $kit: height min() not using var(--${kit}-drawer-h-cap)"; kf=1; }
  [ "$kf" = 0 ] && echo "  ok    $kit"
  [ "$kf" = 1 ] && fail=1
done

if [ "$fail" = 0 ]; then
  echo "RESULT: PASS (drawer w/h caps flow from --shell-drawer-{w,h}-cap in every kit)"
else
  echo "RESULT: FAIL — tokenize: shared --shell-drawer-{w,h}-cap -> kit alias --<kit>-drawer-{w,h}-cap -> min(var(--<kit>-drawer-X), var(--<kit>-drawer-X-cap))"
fi
exit $fail
