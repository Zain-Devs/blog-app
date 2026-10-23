export function Loader() {
  return (
    <div className="center" role="status" aria-live="polite">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error" role="alert">
      <p>⚠️ {message}</p>
      {onRetry && <button onClick={onRetry}>Try again</button>}
    </div>
  );
}
