import { useLocation, useNavigate } from 'react-router';
import type { NamedAPIResource } from '../../../shared/api/api.types';
import styles from './ListCard.module.css';
import { Loader } from '../../../shared/ui/Loader/Loader';
import { useDispatch } from '../../../app/store';
import { type MouseEvent } from 'react';
import {
  getSpecificPokemonData,
  pokemonsActions,
} from '../model/pokemonsSlice';
import { useSelector } from 'react-redux';
import { useGetOnePokemonQuery } from '../../../shared/api/pokemonApi';
import { PokemonSkeletonCard } from './PokemonCardSkeleton';
import { tranformPokemonData } from '../../../shared/lib/transformPokemonData';
import { getErrorMessage } from '../../../shared/api/getErrorMessage';

export const ListCard = ({ pokemon }: { pokemon: NamedAPIResource }) => {
  const {
    data: pokemonData,
    isLoading: isLoadingPokemon,
    error: errorPokemon,
  } = useGetOnePokemonQuery(pokemon);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const isSelected = useSelector(getSpecificPokemonData(pokemon.name));

  if (isLoadingPokemon) {
    return <PokemonSkeletonCard />;
  }

  if (!pokemonData) {
    return (
      <li className={styles['card-layout-wrapper']}>
        <div className={styles['error-card']}>
          <p className={styles['error-message']}>No data available.</p>
        </div>
      </li>
    );
  }

  if (errorPokemon) {
    return (
      <li className={styles['card-layout-wrapper']}>
        <div className={styles['error-card']}>
          <p className={styles['error-message']}>
            {getErrorMessage(errorPokemon)}
          </p>
        </div>
      </li>
    );
  }

  const data = tranformPokemonData(pokemonData);

  const handleCardClick = () => {
    const search = location.search;
    navigate({ pathname: `/pokemon/${pokemon.name}`, search });
  };

  const handleCheckboxClick = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();

    const checked = event.currentTarget.checked;

    if (checked) {
      dispatch(pokemonsActions.addPokemon(data));
    } else {
      dispatch(pokemonsActions.removePokemon(data));
    }
  };

  const { name, image, type, order } = data;

  return (
    <li
      id={name.toLowerCase()}
      className={styles['card-layout-wrapper']}
      onClick={handleCardClick}
    >
      <div className={styles['checkbox-wrapper']}>
        <input
          type="checkbox"
          className={styles.checkbox}
          onChange={() => {}}
          onClick={handleCheckboxClick}
          checked={isSelected}
        />
      </div>

      <div className={styles['image-container']}>
        {isLoadingPokemon ? (
          <div className={styles.image}>
            <Loader />
          </div>
        ) : (
          <img
            className={styles.image}
            src={image !== '' ? image : './placeholder.png'}
            alt={name}
            loading="lazy"
          />
        )}
      </div>
      <div className={styles.title}>{name}</div>
      <div className={styles.order}>
        {order !== -1
          ? `#${order.toString().padStart(3, '0')}`
          : 'yet to classify'}
      </div>
      <div className={styles.type}>{type}</div>
    </li>
  );
};
