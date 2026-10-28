import Config from 'react-native-config';

const baseUrl = Config.TMDB_BASE_URL?.trim();
const readAccessToken = Config.TMDB_READ_ACCESS_TOKEN?.trim();

if (!baseUrl || !readAccessToken) {
  throw new Error(
    'Falta configurar TMDB. Revisá el archivo .env y recompilá la aplicación.',
  );
}

export const env = {
  tmdbBaseUrl: baseUrl,
  tmdbReadAccessToken: readAccessToken,
};