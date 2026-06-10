// Debug aid — copy into src/shell/, mount <OverflowProbe /> in Shell, narrow the
// viewport until the overflow appears, then DELETE before committing. See SKILL.md.
//
// Docks top-right (never covers the bottom horizontal scrollbar) and shows a Δ
// badge that turns red when the page is over-wide. Collapsed by default; "log"
// expands the full readout. "Copy" works without expanding.
import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";

function describe(el: Element): string {
  const tag = el.tagName.toLowerCase();
  const id = (el as HTMLElement).id ? `#${(el as HTMLElement).id}` : "";
  const className = typeof el.className === "string" ? el.className.trim() : "";
  const cls = className ? "." + className.split(/\s+/).slice(0, 4).join(".") : "";
  return `${tag}${id}${cls}`;
}

function dump(el: Element, label: string): string {
  const cs = getComputedStyle(el);
  return `${label}: pos=${cs.position} ovx=${cs.overflowX} w=${cs.width} padR=${cs.paddingRight} marR=${cs.marginRight} top=${cs.top} left=${cs.left} tf=${cs.transform} filter=${cs.filter}`;
}

// Walk popup -> ancestors; flag any that establishes a containing block for a
// position:fixed child (transform/filter/perspective/contain/backdrop-filter),
// which would re-anchor the popup off the viewport.
function cbBreakers(el: Element): string[] {
  const out: string[] = [];
  let n = el.parentElement;
  while (n && n !== document.documentElement) {
    const cs = getComputedStyle(n);
    const hits: string[] = [];
    if (cs.transform !== "none") hits.push(`transform=${cs.transform}`);
    if (cs.filter !== "none") hits.push(`filter=${cs.filter}`);
    if (cs.perspective !== "none") hits.push(`perspective=${cs.perspective}`);
    if (cs.backdropFilter && cs.backdropFilter !== "none")
      hits.push(`backdrop-filter=${cs.backdropFilter}`);
    if (cs.contain && cs.contain !== "none") hits.push(`contain=${cs.contain}`);
    if (cs.willChange && cs.willChange !== "auto")
      hits.push(`will-change=${cs.willChange}`);
    if (hits.length) out.push(`    ^ ${describe(n)} :: ${hits.join("  ")}`);
    n = n.parentElement;
  }
  return out;
}

interface Report {
  text: string;
  delta: number;
  offX: number | null;
}

function buildReport(): Report {
  const de = document.documentElement;
  const vw = de.clientWidth;
  const delta = de.scrollWidth - vw;
  const rectOffenders: string[] = [];
  const internal: { s: string; dx: number }[] = [];

  document.querySelectorAll("*").forEach((el) => {
    if (el.closest("[data-overflow-probe]")) return;
    const r = el.getBoundingClientRect();
    if (r.right > vw + 0.5 || r.left < -0.5) {
      rectOffenders.push(
        `${describe(el)}  w=${Math.round(r.width)} L=${Math.round(r.left)} R=${Math.round(r.right)}`,
      );
    }
    const dx = el.scrollWidth - el.clientWidth;
    if (dx > 1 && el.clientWidth > 0) {
      const cs = getComputedStyle(el);
      internal.push({
        s: `${describe(el)}  scrollW=${el.scrollWidth} clientW=${el.clientWidth} d=${dx} ovx=${cs.overflowX}`,
        dx,
      });
    }
  });
  internal.sort((a, b) => b.dx - a.dx);

  const popups = Array.from(
    document.querySelectorAll('[role="dialog"], [role="alertdialog"]'),
  );
  const popupLines: string[] = [];
  let offX: number | null = null;
  popups.forEach((p) => {
    const r = p.getBoundingClientRect();
    const cs = getComputedStyle(p);
    const cx = (r.left + r.right) / 2;
    const o = Math.round(cx - vw / 2);
    if (offX === null || Math.abs(o) > Math.abs(offX)) offX = o;
    popupLines.push(
      `  ${describe(p)}  pos=${cs.position} L=${Math.round(r.left)} R=${Math.round(r.right)} cx=${Math.round(cx)} | viewport cx=${Math.round(vw / 2)} -> offX=${o}  top=${Math.round(r.top)}`,
    );
    const br = cbBreakers(p);
    popupLines.push(
      ...(br.length ? br : ["    ^ (no transform/filter/contain ancestor)"]),
    );
  });

  const vvp = window.visualViewport;
  const locked = getComputedStyle(document.body).overflowX === "hidden";
  const text = [
    "=== OVERFLOW PROBE ===",
    `scroll-lock: ${locked ? "ON  -> dialog OPEN" : "off -> dialog CLOSED"}`,
    `ua: ${navigator.userAgent}`,
    `vw(clientW): ${vw}  innerW: ${window.innerWidth}  visualVP: ${vvp ? Math.round(vvp.width) : "n/a"}  scrollW: ${de.scrollWidth}  delta: ${delta}`,
    dump(de, "html"),
    dump(document.body, "body"),
    `rect offenders (${rectOffenders.length}):`,
    ...(rectOffenders.length
      ? rectOffenders.map((o, i) => `  ${i + 1}. ${o}`)
      : ["  (none)"]),
    `internal overflow, top 12 (${internal.length}):`,
    ...(internal.length
      ? internal.slice(0, 12).map((o, i) => `  ${i + 1}. ${o.s}`)
      : ["  (none)"]),
    `open popups (${popups.length})  [offX!=0 = drifted; ^ = re-anchoring ancestor]:`,
    ...(popups.length
      ? popupLines
      : ["  (none - open the dialog BEFORE you measure)"]),
    "======================",
  ].join("\n");

  return { text, delta, offX };
}

export function OverflowProbe() {
  const [report, setReport] = useState<Report>({
    text: "",
    delta: 0,
    offX: null,
  });
  const [open, setOpen] = useState(false);

  const measure = useCallback(() => {
    const r = buildReport();
    console.log(r.text);
    setReport(r);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(measure, 350);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const over = report.delta > 0;
  const drift = report.offX !== null && Math.abs(report.offX) > 0;

  return (
    <div
      data-overflow-probe
      style={{
        position: "fixed",
        top: 8,
        right: 8,
        zIndex: 2147483647,
        width: "min(94vw, 440px)",
        boxSizing: "border-box",
        font: "12px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace",
        color: "#ddd",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          flexWrap: "wrap",
          padding: 6,
          background: "rgba(0,0,0,0.9)",
          border: "1px solid #333",
          borderRadius: 6,
        }}
      >
        <span style={{ ...badge, background: over ? "#c0392b" : "#1e8e4e" }}>
          {over
            ? `OVER-WIDE +${report.delta}px`
            : `fits (delta ${report.delta})`}
        </span>
        {report.offX !== null && (
          <span style={{ ...badge, background: drift ? "#c0392b" : "#1e8e4e" }}>
            {drift ? `off-center ${report.offX}px` : "centered"}
          </span>
        )}
        <ProbeButton onClick={measure}>Re-measure</ProbeButton>
        <ProbeButton onClick={() => navigator.clipboard?.writeText(report.text)}>
          Copy
        </ProbeButton>
        <ProbeButton onClick={() => setOpen((o) => !o)}>
          {open ? "hide log" : "log"}
        </ProbeButton>
      </div>
      {open && (
        <textarea
          readOnly
          value={report.text}
          onFocus={(e) => e.currentTarget.select()}
          style={{
            marginTop: 6,
            boxSizing: "border-box",
            width: "100%",
            height: 320,
            maxHeight: "70vh",
            resize: "vertical",
            background: "#000",
            color: "#46e08a",
            border: "1px solid #2a2a2a",
            font: "inherit",
            padding: 8,
          }}
        />
      )}
    </div>
  );
}

function ProbeButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  const [down, setDown] = useState(false);
  const release = () => setDown(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={() => setDown(true)}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      style={{
        ...btn,
        background: down ? "#2563eb" : "transparent",
        borderColor: down ? "#2563eb" : "#555",
        transform: down ? "scale(0.9)" : "scale(1)",
        transition:
          "transform 90ms ease, background 90ms ease, border-color 90ms ease",
      }}
    >
      {children}
    </button>
  );
}

const badge: React.CSSProperties = {
  padding: "3px 8px",
  borderRadius: 4,
  fontWeight: 700,
  color: "#fff",
  whiteSpace: "nowrap",
};

const btn: React.CSSProperties = {
  font: "inherit",
  color: "#fff",
  background: "transparent",
  border: "1px solid #555",
  borderRadius: 4,
  padding: "3px 10px",
  touchAction: "manipulation",
  WebkitTapHighlightColor: "transparent",
  userSelect: "none",
};
