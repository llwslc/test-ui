import "./Loader.css";

export default function AbyssLoader() {
  return (
    <div className="abyss-loader" role="status" aria-label="Loading ABYSS">
      <svg className="abyss-loader__sigil" viewBox="0 0 64 64" width="64" height="64">
        <circle className="abyss-loader__ring" cx="32" cy="32" r="27" />
        <path className="abyss-loader__star" d="M32 9 L46 51 L10 25 L54 25 L18 51 Z" />
        <circle className="abyss-loader__eye" cx="32" cy="32" r="5" />
      </svg>
      <span className="abyss-loader__label">stirring</span>
    </div>
  );
}
