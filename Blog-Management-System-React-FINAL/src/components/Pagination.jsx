export default function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Blog pagination">
      <ul className="pagination justify-content-center mt-4">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (number) => (
            <li
              className={`page-item ${page === number ? "active" : ""}`}
              key={number}
            >
              <button className="page-link" onClick={() => setPage(number)}>
                {number}
              </button>
            </li>
          )
        )}

        <li
          className={`page-item ${page === totalPages ? "disabled" : ""}`}
        >
          <button
            className="page-link"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
