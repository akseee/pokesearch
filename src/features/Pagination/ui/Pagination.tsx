import styles from './Pagination.module.css';

export const Pagination = ({
  isLoading,
  page,
  totalPages,
  onPageChange,
}: {
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <nav className={styles.pagination} aria-label="pagination">
      <button
        className={styles.pageButton}
        disabled={page === 1 || isLoading}
        aria-label="first page"
        onClick={() => onPageChange(1)}
      >
        1
      </button>
      <button
        className={styles.pageButton}
        disabled={page <= 5 || isLoading}
        aria-label="previous pages"
        onClick={() => onPageChange(Math.max(page - 5, 1))}
      >
        &#x25c0; &#x25c0;
      </button>
      <button
        className={styles.pageButton}
        aria-label="previous page"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1 || isLoading}
      >
        &#x25c0;
      </button>

      <button
        className={`${styles.pageButton} ${styles.pageButtonActive} `}
        aria-label="current page"
        disabled
      >
        {page}
      </button>

      <button
        className={styles.pageButton}
        aria-label="next page"
        disabled={page === totalPages || isLoading}
        onClick={() => onPageChange(page + 1)}
      >
        &#x25b6;
      </button>

      <button
        className={styles.pageButton}
        aria-label="next pages"
        disabled={page + 5 > totalPages || isLoading}
        onClick={() => onPageChange(Math.min(page + 5, totalPages))}
      >
        &#x25b6; &#x25b6;
      </button>

      <button
        disabled={page === totalPages || isLoading}
        className={styles.pageButton}
        aria-label="last page"
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </button>
    </nav>
  );
};
