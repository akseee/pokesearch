import styles from './AboutPage.module.css';

export const AboutPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}></div>
      <div className={styles.article}>
        <article className={styles['article-content']}>
          <p className={styles.text}>
            This is a learning project built as part of React and TypeScript
            development practice. It uses the PokeAPI — a public RESTful API
            that provides data about Pokémon.
          </p>

          <p className={styles.text}>
            The user can search for Pokémon by name, view detailed information
            about each one, and navigate through paginated search results. The
            application features client-side routing, query parameter
            synchronization via the URL, dynamic data fetching, and
            loading/error state handling.
          </p>

          <p className={(styles.text, styles.special)}>
            Thank you for checking out this project!
          </p>

          <div className={styles.links}>
            <p>
              Task provided by{' '}
              <a
                href="https://rs.school/courses/reactjs"
                target="_blank"
                rel="noopener noreferrer"
              >
                RS School
              </a>
            </p>
            <p>
              My github:{' '}
              <a
                href="https://github.com/akseee"
                target="_blank"
                rel="noopener noreferrer"
              >
                @akseee
              </a>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};
