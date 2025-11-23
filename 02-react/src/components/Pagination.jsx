import styles from "./Pagination.module.css";

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
    <nav className={styles.pagination}>
      <a
        href="#"
        className={`${styles.paginationLink} ${
          isFirstPage ? "is-disabled" : ""
        }`}
        aria-label="Previous page"
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

      <div className={styles.paginationPages} id="pagination-pages">
        {pages.map((page) => (
          <a
            href="#"
            key={page}
            className={`${styles.paginationLink} ${
              currentPage === page ? "is-active" : ""
            }`}
            onClick={(event) => handlePageChange(event, page)}
          >
            {page}
          </a>
        ))}
      </div>

      <a
        href="#"
        className={`${styles.paginationLink} ${
          isLastPage ? "is-disabled" : ""
        }`}
        aria-label="Next page"
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
