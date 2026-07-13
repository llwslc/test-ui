#!/bin/sh
# prompt-lint — the MECHANICAL subset of the Form axis (SKILL.md is the full read).
# Run in place. Catches what a regex can, incl. high-signal rationale/consequence tells
# (因为/命不中/免得…) and exclusive conditionals (仅当/…才…, say 当X做Y directly);
# deeper content judgment (layer/cryptic/emphasis) stays a READ — see SKILL.md.
#   sh .claude/skills/prompt-lint/check.sh [file ...]      default: prompt/**/*.md
# Exit 0 = mechanical checks clean. The REVIEW block never fails (heuristic).
set -u
ROOT=$(cd "$(dirname "$0")/../../.." && pwd) || exit 2
cd "$ROOT" || exit 2
FILES="$*"
[ -n "$FILES" ] || FILES=$(find prompt -name '*.md' | sort)
# hard-wrap is a repo-wide convention, not a prompt/ one — README.md and the SKILL.md docs
# answer to it too. Every other check below is 中文 spec-specific and stays on $FILES.
MD_FILES="$*"
[ -n "$MD_FILES" ] || MD_FILES=$(git ls-files '*.md' 2>/dev/null | sort)
fail=0

echo "## mixed punctuation register — ASCII ,:;() touching 汉字 outside code spans"
seen=0
for f in $FILES; do
  hits=$(perl -CSD -ne 's/`[^`]*`//g; print "  '"$f"':$.: $_" if /(?:\p{Han}[,:;()]|[,:;()]\p{Han})/' "$f")
  if [ -n "$hits" ]; then printf '%s\n' "$hits"; seen=1; fail=1; fi
done
[ "$seen" = 0 ] && echo "  -> clean"

echo
echo "## heading carrying a trailing qualifier (the title should stand alone)"
hits=$(grep -nE '^#{2,6} .+ (—|--|：|:|（|\()' $FILES 2>/dev/null || true)
if [ -n "$hits" ]; then printf '%s\n' "$hits" | sed 's/^/  /'; fail=1; else echo "  -> clean"; fi

echo
echo "## hard-wrapped prose — one paragraph is ONE line (repo-wide; let the editor soft-wrap)"
# A hit = ANY line that continues the previous line's paragraph — same rule the fixer applies,
# so green here means nothing is left to unwrap. Hard wraps break copy-paste and make a one-word
# edit reflow the whole paragraph in the diff. Fix: python3 .claude/skills/prompt-lint/unwrap.py <file>.
hits=$(python3 - $MD_FILES <<'PYEOF'
import pathlib, re, sys

TICK = chr(96)                                              # ` — a literal one breaks the $() parse
FENCES = (TICK * 3, "~~~")
ORDERED = re.compile(r"\d+[.)]\s")
LINKDEF = re.compile(r"\[[^\]]+\]:")


def opens_block(s):                                         # a NEW block — never a continuation.
    if s[0] in "#|><=":                                     # a LONE backtick is an inline code
        return True                                         # span (fences match above) and * only
    if s[:3] in ("---", "***", "___"):                      # bullets with a space after it —
        return True                                         # calling either a block leaves the
    if s[0] in "-*+" and len(s) > 1 and s[1] in " \t":      # paragraph split and this gate green.
        return True
    return bool(ORDERED.match(s) or LINKDEF.match(s))


out = []
for f in sys.argv[1:]:
    lines = pathlib.Path(f).read_text(encoding="utf-8").splitlines()
    start = 0
    if lines and lines[0].strip() == "---":                 # YAML frontmatter
        for i, ln in enumerate(lines[1:], 2):
            if ln.strip() == "---":
                start = i
                break
    fence, prev = False, ""
    for i, ln in enumerate(lines[start:], start + 1):
        s = ln.strip()
        if s.startswith(FENCES):
            fence, prev = not fence, ""
            continue
        if fence or not s:
            prev = ""
            continue
        if prev and not opens_block(s):
            out.append(f"  {f}:{i - 1}: {prev}")
        prev = s
print("\n".join(out))
PYEOF
)
if [ -n "$hits" ]; then printf '%s\n' "$hits"; fail=1; else echo "  -> clean"; fi

echo
echo "## layer separation — components/ ⊥ demo · app/ ⊥ library · theme/(风格) ⊥ both"
# demo artifacts (page-only): hero banner, the Suspense Loader, the brand logo.
demo='[Hh]ero|[Ll]oader|[Ll]ogo'
# Base UI control names (PascalCase, case-sensitive so 'radial'/'::selection'/'transform' don't trip).
# theme/ is the 风格 root: it skins NOTHING by name — it owns palette/type/geometry/atmosphere/motion only.
ctrl='Button|Switch|ToggleGroup|Toggle|Checkbox|Radio|Select|Combobox|Autocomplete|Slider|NumberField|TextField|Fieldset|Progress|Meter|Tabs|Accordion|Collapsible|Tooltip|Popover|PreviewCard|Menubar|NavigationMenu|NavMenu|ContextMenu|Dialog|AlertDialog|Drawer|Toast|Avatar|Badge|Toolbar|ScrollArea|Panel|Separator|徽章|进度条'
lk=0
for f in $FILES; do
  case "$f" in
    */components/*) pat="演示|app\.md|App\.|外壳|侧栏|$demo"; why='components/ must not know the demo (no hero/loader/logo/shell/sidebar)';;
    */app/*)        pat='components\.md|components/'; why='app/ knows control NAMES + 风格 only, not the components/ layer';;
    prompt/theme/*) pat="components/|app/|components\.md|app\.md|演示页|$demo|$ctrl"; why='theme/ is the 风格 root — names no control and no demo part';;
    *)              pat=''; why='';;
  esac
  [ -n "$pat" ] || continue
  bad=$(grep -nE "$pat" "$f" 2>/dev/null || true)
  if [ -n "$bad" ]; then printf '  LEAK  %s — %s:\n' "$f" "$why"; printf '%s\n' "$bad" | sed 's/^/    /'; lk=1; fail=1; fi
done
[ "$lk" = 0 ] && echo "  -> clean"

echo
echo "## kit-motif coupling — kit-agnostic docs (components.md · app.md · playbook.md) name no one kit's shape"
# Each kit's motifs live in <domain>/theme/<kit>.md. High-signal words only — NOT generic
# geometry like 切角/圆角/网格, which components.md legitimately offers and delegates to theme.
# Kit ids + labels derive from the registry — a hardcoded roster staled once already.
roster=$( { grep -oE 'id: "[a-z0-9-]+"' src/kits/registry.ts | sed 's/id: "//; s/"//';
            grep -oE 'label: "[A-Za-z0-9]+"' src/kits/registry.ts | sed 's/label: "//; s/"//' | tr 'A-Z' 'a-z'; } | sort -u | paste -sd'|' -)
[ -n "$roster" ] || { echo "  ERR kit roster empty — src/kits/registry.ts unreadable"; exit 2; }
motif="符印|法阵|触手|准星|齿轮|铆钉|表盘|仪表|蒸汽|阀门|滚花|摆针|三原形|虹膜|瞳孔|符文|魔典|石板|黄铜|琥珀|霓虹|rune|reticle|gear|rivet|gauge|steam|valve|sigil|tendril|knurl|neon|$roster"
mk=0
for f in $FILES; do
  case "$f" in
    prompt/components/components.md|prompt/app/app.md|prompt/playbook.md) ;;
    *) continue ;;
  esac
  # high-signal motifs (kit names case-insensitive), plus '眼' as a shape-noun (但 肉眼/一眼/… 是成语，滤掉)
  bad=$( { grep -nE "$motif" "$f" 2>/dev/null; grep -inE "$roster" "$f" 2>/dev/null; grep -nE '眼' "$f" 2>/dev/null | grep -vE '肉眼|一眼|眼前|眼下|转眼|眼花|眼看|显眼|抢眼|字眼'; } | sort -t: -k1,1n -u )
  if [ -n "$bad" ]; then printf '  LEAK  %s — kit-specific motif (belongs in <domain>/theme/<kit>):\n' "$f"; printf '%s\n' "$bad" | sed 's/^/    /'; mk=1; fail=1; fi
done
[ "$mk" = 0 ] && echo "  -> clean"

echo
echo "## rationale / consequence fluff — spec states HOW, not WHY (strip the 因为/否则/命不中/等于没写/免得… tell)"
# high-signal 'explain why / what happens if not / what it's NOT for' connectives (末者
# 即「不写不为了什么」: 不是为了…/并非为了…). Curated to words with ~0 legitimate use in a
# terse HOW-spec (视觉描述词 错位/闪/会 are NOT here — they have real uses; 否定 DIRECTIVES
# 别/绝不/不得 are NOT here either — they pair with a positive rule, a READ call not a regex).
# grow this list as new fluff tells surface; it would have caught the §7 [data-*] block.
why='因为|否则|之所以|原因|导致|命不中|永不匹配|等于没写|白写|两回事|免得|以免|不是为了|并非为了|只维护|唯一一份|只留一处'
hits=$(grep -HnE "$why" $FILES 2>/dev/null || true)
if [ -n "$hits" ]; then printf '%s\n' "$hits" | sed 's|^|  |'; fail=1; else echo "  -> clean"; fi

echo
echo "## exclusive-conditional — state 「当X，做Y」 directly, not 「仅当X才Y / 只有X才Y / X时才Y」"
# the objectionable form is 「…才 <动作>」 and 「只有…才」. skips 才是(强调)/刚才/方才/才能,
# and 只在…描(空间范围，无 才) is left alone. curated 动词 list — grow as new ones surface.
verb='加|给|显|写|放|动|用|走|留|做|描|挂|贴|填|升|转|亮|染|就近|放进|生效|收口|收边|落位|铺|收'
hits=$(grep -HnE "仅当|只有当|只当|只有[^。；;、]*才|才($verb)" $FILES 2>/dev/null | grep -vE '刚才|方才' || true)
if [ -n "$hits" ]; then printf '%s\n' "$hits" | sed 's|^|  |'; fail=1; else echo "  -> clean"; fi

echo
echo "## one control per line — a skin-doc bullet must not introduce a SECOND component mid-line (。X：/；X 是…)"
# components/theme/<kit>.md: each control gets its own bullet; shared skin = define one,
# the next line says 同/复用 X. Component names derived from components.md §6, not hardcoded.
COMPS=$(awk '/^## 6\. 组件/{f=1} /^## 6\.1/{f=0} f' prompt/components/components.md 2>/dev/null \
  | grep -oE '[A-Z][A-Za-z]+' | sort -u | grep -vE '^(Base|UI)$' | paste -sd'|' -)
if [ -n "$COMPS" ]; then
  hits=$(grep -HnE "[。；](${COMPS})(：| 标题| 是| 的兜底)" prompt/components/theme/*.md 2>/dev/null || true)
  if [ -n "$hits" ]; then printf '%s\n' "$hits" | sed 's|^|  |'; fail=1; else echo "  -> clean"; fi
else echo "  -> skip (components.md §6 not found)"; fi

echo
echo "## skin-doc §2 order — bullets follow components.md §6 order (ASCII-led lines only; 汉字-led exempt)"
ORDER_OUT=$(python3 - <<'PYEOF'
import pathlib, re, sys
comp = pathlib.Path("prompt/components/components.md").read_text()
sec = comp.split("## 6. 组件")[1].split("## 6.1")[0]
canon, seen = [], set()
for m in re.finditer(r"[A-Z][A-Za-z/]+", sec):
    n = m.group(0)
    if n not in seen and n not in ("Base", "UI"): seen.add(n); canon.append(n)
idx = {n: i for i, n in enumerate(canon)}
bad = 0
for p in sorted(pathlib.Path("prompt/components/theme").glob("*.md")):
    body = p.read_text().split("## 2. 组件皮肤决定", 1)
    if len(body) < 2: continue
    last, lastname = -1, None
    for ln, line in enumerate(body[1].split("\n"), 1):
        if not line.startswith("- "): continue
        m = re.match(r"- \*{0,2}([A-Z][A-Za-z/]+)", line)
        if not m or m.group(1) not in idx: continue
        i = idx[m.group(1)]
        if i < last:
            print(f"  {p}:{m.group(1)} 排在 {lastname} 之后，违反 §6 顺序"); bad = 1
        last, lastname = i, m.group(1)
for p in sorted(pathlib.Path("prompt/components").rglob("*.md")):
    text = p.read_text(); lines = text.split("\n")
    for n, line in enumerate(lines):
        if not line.startswith("- "): continue
        for m in re.finditer(r"(?:同|复用)\s*([A-Z][A-Za-z/]+)", line):
            name = m.group(1)
            if name not in idx: continue
            earlier = "\n".join(lines[:n])
            if name not in earlier and name.rstrip("s") not in earlier:
                print(f"  {p}:{n+1} 引用「同/复用 {name}」但 {name} 此前未定义（向前引用）"); bad = 1
sys.exit(bad)
PYEOF
) && ORDER_OK=1 || ORDER_OK=0
if [ "$ORDER_OK" = 1 ]; then echo "  -> clean"; else printf '%s\n' "$ORDER_OUT"; fail=1; fi

echo
echo "## REVIEW — emphasis mix in a bullet block (heuristic, never fails; eyeball each)"
echo "   bold must mark ONE consistent thing per peer set; a block with both '- **' and"
echo "   '- plain' leads is a CANDIDATE — most are fine (bold font/term vs plain prose);"
echo "   the real bug is parallel peers split on bold (e.g. component bullets)."
for f in $FILES; do
  awk -v F="$f" '
    function flush(){ if(n>=2 && b>0 && p>0) printf "  %s:%d  %d bullets — %d bold-lead / %d plain-lead\n",F,start,n,b,p; n=0;b=0;p=0;start=0 }
    /^- /{ if(n==0) start=NR; n++; if($0 ~ /^- \*\*/) b++; else p++; next }
    !/^- /{ flush() }
    END{ flush() }
  ' "$f"
done

echo
echo "## REVIEW — re-read your CHANGED prose as prose (semantic, not a grep)"
echo "   spec text is writing, not code — cruft has infinite forms (mechanism / negation-"
echo "   contrast / history / rationale / verbosity) no keyword list can enumerate. After"
echo "   editing, RE-READ each clause you touched and ask: is it terse, correct, and"
echo "   describing THIS thing's own nature? If it explains WHY, disclaims another rule"
echo "   (不走实填), leaks the CSS (随词宽走), or recounts history (替掉X) — cut it."

echo
echo "## REVIEW — decode test on CHANGED lines: 压缩过度 fails the same as 冗余 (semantic)"
echo "   a fresh session holding ONLY this doc + the code literals must re-derive the"
echo "   decision from each line. For every line you touched ask:"
echo "   • does a cited value use the token's REAL name+scope as in tokens.css? An"
echo "     invented shorthand that widens the claim ('各强调色 tint .2' when only primary"
echo "     has a tint) is a WRONG SPEC, not just style."
echo "   • is any subject/relation elided past recovery (带高于行)? Spell it out once"
echo "     (涂划带高过行框) — terse is the house style, opaque is a defect."
echo "   • back-writing chat into spec: cite CODE literals, never paraphrase the chat."
echo "   Over-compression and fluff are EQUAL failures — never fix one by minting the other."

case " $FILES " in
  *prompt/theme/*) echo; echo "## cross-kit — theme docs in scope"; echo "   run: sh .claude/skills/prompt-lint/parallel.sh — read each section across the kits for an OUTLIER clause (SKILL.md: Siblings are the control)";;
esac

echo
if [ "$fail" = 0 ]; then echo "RESULT: PASS (mechanical clean — still do the SKILL.md read for content + emphasis)"; else echo "RESULT: FINDINGS — fix the mechanical hits above"; fi
exit $fail
