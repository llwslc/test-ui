import "./Loader.css";

export default function NovaLoader() {
  return (
    <div className="nova-loader" role="status" aria-label="Loading NOVA">
      <svg className="nova-loader__hud" viewBox="0 0 64 64" width="60" height="60">
        <path
          className="nova-loader__brackets"
          d="M6 16 V6 H16 M48 6 H58 V16 M58 48 V58 H48 M16 58 H6 V48"
        />
        <path
          className="nova-loader__cross"
          d="M23 32 H29 M35 32 H41 M32 23 V29 M32 35 V41"
        />
        <line className="nova-loader__scan" x1="11" y1="32" x2="53" y2="32" />
      </svg>
      <span className="nova-loader__label">SCANNING</span>
    </div>
  );
}
