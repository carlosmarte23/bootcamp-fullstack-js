export function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevPageChange = (event) => {
    event.preventDefault();
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPageChange = (event) => {
    event.preventDefault();
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageChange = (event, page) => {
    event.preventDefault();
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav className="pagination">
      <a
        href="#"
        id="pagination-prev"
        className="pagination-link button"
        aria-label="Previous page"
        aria-disabled={isFirstPage ? "true" : "false"}
        onClick={handlePrevPageChange}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </a>

      <div className="pagination-pages" id="pagination-pages">
        {pages.map((page) => (
          <a
            href="#"
            key={page}
            className={`pagination-link button ${
              page === currentPage ? "is-active" : ""
            }`}
            onClick={(event) => handlePageChange(event, page)}
          >
            {page}
          </a>
        ))}
      </div>

      <a
        href="#"
        id="pagination-next"
        className="pagination-link button"
        aria-label="Next page"
        aria-disabled={isLastPage ? "true" : "false"}
        onClick={handleNextPageChange}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </a>
    </nav>
  );
}
