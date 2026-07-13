import "./Loader.css";

export default function Loader() {
  return (
    <div className="bauhaus-loader" role="status" aria-label="Loading">
      <div className="bauhaus-loader__forms">
        <span className="bauhaus-loader__form bauhaus-loader__form--square" />
        <span className="bauhaus-loader__form bauhaus-loader__form--circle" />
        <svg
          className="bauhaus-loader__form bauhaus-loader__form--tri"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 3 22 21H2Z" />
        </svg>
      </div>
      <div className="bauhaus-loader__label">Composing</div>
    </div>
  );
}
