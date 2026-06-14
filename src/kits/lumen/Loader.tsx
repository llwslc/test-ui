import "./Loader.css";

export default function LumenLoader() {
  return (
    <div className="lumen-loader" role="status" aria-label="Loading LUMEN">
      <svg className="lumen-loader__mark" viewBox="0 0 64 64" width="60" height="60">
        <path
          className="lumen-loader__crop"
          d="M6 16 V6 H16 M48 6 H58 V16 M58 48 V58 H48 M16 58 H6 V48"
        />
        <circle className="lumen-loader__reg" cx="32" cy="32" r="13" />
        <path className="lumen-loader__cross" d="M32 15 V49 M15 32 H49" />
      </svg>
      <span className="lumen-loader__label">PRINTING</span>
    </div>
  );
}
