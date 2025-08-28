import type { PokemonData } from '../../../shared/types/pokemon.types';

export function downloadCSV(data: PokemonData[]) {
  const headers: Array<keyof PokemonData> = [
    'name',
    'type',
    'id',
    'description',
    'image',
  ];

  const rows = data.map((item) =>
    headers.map((col) => {
      const cell = item[col] ?? '';
      return `"${String(cell).replace(/"/g, '""')}"`;
    })
  );

  const csvContent = [headers, ...rows]
    .map((row) => row.join(','))
    .join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  return blob;
}
