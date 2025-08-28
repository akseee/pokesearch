import { Component } from 'react';
import type { PokemonStats } from '../../types/pokemon.types';
import styles from './PokemonCardLayout.module.css';

interface PokemonStatsListProps {
  stats?: PokemonStats;
}

export default class PokemonStatsList extends Component<PokemonStatsListProps> {
  render() {
    const { stats } = this.props;
    return (
      <ul className={styles.stats}>
        <li className={styles.stat} key="1">
          <span className={styles['stat-title']}>hp</span>
          {stats ? stats.hp : 'unknown'}
        </li>
        <li className={styles.stat} key="2">
          <span className={styles['stat-title']}>attack</span>
          {stats ? stats.attack : 'unknown'}
        </li>
        <li className={styles.stat} key="3">
          <span className={styles['stat-title']}>defense</span>
          {stats ? stats.defense : 'unknown'}
        </li>
        <li className={styles.stat} key="4">
          <span className={styles['stat-title']}>speed</span>
          {stats ? stats.speed : 'unknown'}
        </li>
        <li className={styles.stat} key="5">
          <span className={styles['stat-title']}>special defense</span>
          {stats ? stats['special-defense'] : 'unknown'}
        </li>
        <li className={styles.stat} key="6">
          <span className={styles['stat-title']}>special attack</span>
          {stats ? stats['special-attack'] : 'unknown'}
        </li>
      </ul>
    );
  }
}
