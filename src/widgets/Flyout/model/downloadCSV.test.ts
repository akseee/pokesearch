import { pikachu, bulbasaur } from '../../../shared/lib/mocks';
import { downloadCSV } from './downloadCSV';

describe('downloadCSV', () => {
  test('creates CSV Blob with correct content with two pokemons and file type', async () => {
    const data = [pikachu, bulbasaur];
    const blob = downloadCSV(data);

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('text/csv;charset=utf-8;');

    const text = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(blob);
    });
    expect(text).toContain('"pikachu","electric","25","test","pikachu.png"');
    expect(text).toContain('"bulbasaur","grass","26","test","bulbasaur.png"');
  });
});
