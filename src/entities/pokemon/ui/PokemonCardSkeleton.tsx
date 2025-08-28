import { PokemonCardLayout } from '../../../shared/ui/PokemonCardLayout/PokemonCardLayout';

export const PokemonSkeletonCard = () => {
  return (
    <PokemonCardLayout
      loading={true}
      order={0}
      type={'unknown'}
      title={'Pokemon'}
    />
  );
};
