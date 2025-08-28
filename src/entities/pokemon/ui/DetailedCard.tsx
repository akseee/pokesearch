import styles from './DetailedCard.module.css';
import PokemonStatsList from '../../../shared/ui/PokemonCardLayout/PokemonStatsList';
import type { PokemonData } from '../../../shared/types/pokemon.types';

export const DetailedCard = ({
  pokemonData,
  error,
}: {
  pokemonData: PokemonData;
  error?: string;
}) => {
  if (error) {
    return (
      <div className={styles['card-layout-wrapper']}>failed to load data</div>
    );
  }

  const { name, image, description, stats, type, order } = pokemonData;
  return (
    <div data-id={name.toLowerCase()} className={styles['card-layout-wrapper']}>
      <div className={styles['image-container']}>
        <img
          className={styles.image}
          src={image !== '' ? image : './placeholder.png'}
          alt={name}
          loading="lazy"
        />
      </div>
      <div className={styles.title}>{name}</div>
      <p className={styles.description}>{description}</p>
      <div className={styles.order}>
        {order !== -1
          ? `#${order.toString().padStart(3, '0')}`
          : 'yet to classify'}
      </div>
      <div className={styles.type}>{type}</div>
      <PokemonStatsList stats={stats} />
    </div>
  );
};
