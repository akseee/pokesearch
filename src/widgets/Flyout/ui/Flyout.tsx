import { Fragment, useState, useRef } from 'react';
import styles from './Flyout.module.css';

import { useDispatch } from '../../../app/store';
import { useSelector } from 'react-redux';
import { downloadCSV } from '../model/downloadCSV';
import { pokemonsActions, pokemonsSelectors } from '../../../entities/pokemon';

export const Flyout = () => {
  const dispatch = useDispatch();

  const [csvUrl, setCsvUrl] = useState<string | null>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const count = useSelector(pokemonsSelectors.getSelectedCount);
  const selectedPokemons = useSelector(
    pokemonsSelectors.getSelectedPokemonsData
  );

  const onUnselectAll = () => {
    dispatch(pokemonsActions.clearPokemons());
  };

  const onDownloadClick = () => {
    const blob = downloadCSV(selectedPokemons);
    const url = URL.createObjectURL(blob);
    setCsvUrl(url);

    setTimeout(() => {
      if (downloadRef.current) {
        downloadRef.current.click();
        URL.revokeObjectURL(url);
        setCsvUrl(null);
      }
      dispatch(pokemonsActions.clearPokemons());
    }, 0);
  };

  return (
    <Fragment>
      {count > 0 && (
        <div className={styles.flyout}>
          <span>
            {count} pokemon{count > 1 ? 's' : ''} selected
          </span>
          <button onClick={onUnselectAll}>Unselect all</button>
          <button onClick={onDownloadClick}>Download</button>
          <a
            ref={downloadRef}
            href={csvUrl ?? ''}
            className={styles.blob}
            download={`${selectedPokemons.length}_selected-pokemons.csv`}
          />
        </div>
      )}
    </Fragment>
  );
};
