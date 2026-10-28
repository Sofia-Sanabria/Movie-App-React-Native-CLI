import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { env } from '../config/env';
import { MoviesResponse } from '../types/movie';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',

  baseQuery: fetchBaseQuery({
    baseUrl: `${env.tmdbBaseUrl.replace(/\/+$/, '')}/`,
    timeout: 15000,
    prepareHeaders: headers => {
      headers.set('Authorization', `Bearer ${env.tmdbReadAccessToken}`);
      headers.set('Accept', 'application/json');

      return headers;
    },
  }),

  endpoints: builder => ({
    getPopularMovies: builder.query<MoviesResponse, number>({
      query: page => ({
        url: 'movie/popular',
        params: {
          language: 'es-ES',
          page,
        },
      }),
    }),
  }),
});

export const { useGetPopularMoviesQuery } = tmdbApi;