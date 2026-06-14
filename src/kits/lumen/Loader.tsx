import "./Loader.css";

export default function LumenLoader() {
  return (
    <div className="lumen-loader" role="status" aria-label="Loading LUMEN">
      <svg className="lumen-loader__mark" viewBox="0 0 64 64" width="58" height="58">
        <clipPath id="lumen-loader-clip">
          <rect x="12" y="12" width="40" height="40" />
        </clipPath>
        <g clipPath="url(#lumen-loader-clip)">
          <rect className="lumen-loader__fill" x="12" y="12" width="40" height="40" />
        </g>
        <rect className="lumen-loader__box" x="12" y="12" width="40" height="40" />
        <path
          className="lumen-loader__crop"
          d="M6 16 V6 H16 M48 6 H58 V16 M58 48 V58 H48 M16 58 H6 V48"
        />
      </svg>
      <span className="lumen-loader__label">PRINTING</span>
    </div>
  );
}
