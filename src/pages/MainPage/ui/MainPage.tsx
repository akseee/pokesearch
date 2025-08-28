import { ResultList } from '../../../widgets/ResultsList/ui/ResultList';
import { SearchForm } from '../../../features/SearchForm';
import styles from './MainPage.module.css';
import { Loader } from '../../../shared/ui/Loader/Loader';
import { Pagination } from '../../../features/Pagination';
import { Outlet, useParams } from 'react-router';
import { useSearchQueryParams } from '../../../shared/hooks/useSearchQueryParams';
import {
  pokemonApi,
  useGetManyPokemonsQuery,
} from '../../../shared/api/pokemonApi';
import { useDispatch } from '../../../app/store';
import { getErrorMessage } from '../../../shared/api/getErrorMessage';

export const MainPage = () => {
  const { query, page, setQuery, setPage } = useSearchQueryParams();
  const { pokemon } = useParams();

  const {
    data: pokemonsData,
    isLoading,
    isFetching,
    error,
  } = useGetManyPokemonsQuery({ query, page });

  const dispatch = useDispatch();

  const handleRefresh = () => {
    dispatch(
      pokemonApi.util.invalidateTags([{ type: 'PokemonList', id: page }])
    );
  };

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const loading = isLoading || isFetching;
  const errorMessage = getErrorMessage(error);

  const totalPages = pokemonsData ? Math.ceil(pokemonsData.count / 20) : 1;

  return (
    <div className={styles.wrapper}>
      <SearchForm
        query={query}
        onSubmit={handleSearch}
        onRefresh={handleRefresh}
        isLoading={loading}
      />
      <Pagination
        isLoading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <div className={`${styles.section} ${pokemon ? styles.detailed : ''}`}>
        <div className={styles['left-column']}>
          <ResultList
            pokemons={pokemonsData?.results || []}
            isLoading={loading}
            error={errorMessage || undefined}
          />
        </div>
        {pokemon && (
          <div className={styles['right-column']}>
            <Outlet />
          </div>
        )}
      </div>
      <Pagination
        isLoading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {loading && (
        <div className={styles.loader} data-testid="loader">
          <Loader />
        </div>
      )}
    </div>
  );
};
