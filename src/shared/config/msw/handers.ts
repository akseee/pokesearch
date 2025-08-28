import { http, HttpResponse } from 'msw';

import {
  mockPokemonResponse,
  mockPokemonsPage1,
  mockPokemonsPage2,
  mockSpeciesResponse,
} from '../../lib/mocks';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon', ({ request }) => {
    const url = new URL(request.url);
    const offset = url.searchParams.get('offset');

    if (offset === '20') {
      return HttpResponse.json(mockPokemonsPage2);
    }

    return HttpResponse.json(mockPokemonsPage1);
  }),

  http.get('https://pokeapi.co/api/v2/pokemon-species/:name', () => {
    return HttpResponse.json(mockSpeciesResponse);
  }),

  http.get('https://pokeapi.co/api/v2/pokemon/:name', ({ params }) => {
    const { name } = params;

    if (name === 'notfound') {
      return new Response(null, { status: 404 });
    }

    return HttpResponse.json(mockPokemonResponse);
  }),
];
