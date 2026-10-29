jest.mock('react-native-config', () => ({
  __esModule: true,
  default: {
    TMDB_BASE_URL: 'https://api.themoviedb.org/3',
    TMDB_READ_ACCESS_TOKEN: 'test-token',
  },
}));