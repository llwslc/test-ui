import "./Loader.css";

export default function Loader() {
  return (
    <div className="brass-loader" role="status" aria-label="Loading">
      <div className="brass-loader__gears">
        <svg className="brass-loader__gear brass-loader__gear--a" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3.4" />
          <path d="M12 2v3.2M12 18.8V22M2 12h3.2M18.8 12H22M4.9 4.9l2.3 2.3M16.8 16.8l2.3 2.3M19.1 4.9l-2.3 2.3M7.2 16.8l-2.3 2.3" />
        </svg>
        <svg className="brass-loader__gear brass-loader__gear--b" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="2.6" />
          <path d="M12 3.5v2.6M12 17.9V20.5M3.5 12h2.6M17.9 12h2.6M6 6l1.9 1.9M16.1 16.1 18 18M18 6l-1.9 1.9M7.9 16.1 6 18" />
        </svg>
      </div>
      <div className="brass-loader__label">Pressurizing</div>
    </div>
  );
}
