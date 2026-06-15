import "./Loader.css";

export default function OrmoluLoader() {
  return (
    <div className="ormolu-loader" role="status" aria-label="Loading ORMOLU">
      <svg className="ormolu-loader__crest" viewBox="0 0 72 72" width="72" height="72">
        <circle className="ormolu-loader__ring" cx="36" cy="36" r="30" />
        <g className="ormolu-loader__scroll">
          <path className="ormolu-loader__volute" d="M36 12C20 12 12 22 12 36c0 6 5 10 10 8 4-1.6 4-7 0-8" />
          <path className="ormolu-loader__volute" d="M36 60c16 0 24-10 24-24 0-6-5-10-10-8-4 1.6-4 7 0 8" />
        </g>
        <circle className="ormolu-loader__pearl" cx="36" cy="36" r="4.5" />
      </svg>
      <span className="ormolu-loader__label">opening the salon</span>
    </div>
  );
}
