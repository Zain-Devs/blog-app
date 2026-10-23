export default function Pagination({ pagination, onChange }) {
  const { page, totalPages, hasNext, hasPrev } = pagination;
  return (
    <nav className="pagination" aria-label="Pagination">
      <button disabled={!hasPrev} onClick={() => onChange(page - 1)}>← Prev</button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button key={n} className={n === page ? "active" : ""} onClick={() => onChange(n)}>
          {n}
        </button>
      ))}
      <button disabled={!hasNext} onClick={() => onChange(page + 1)}>Next →</button>
    </nav>
  );
}
