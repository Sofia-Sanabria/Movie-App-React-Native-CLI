import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MovieDetails, MoviesResponse } from '../types/movie';
import { env } from '../config/env';

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

    getMovieDetails: builder.query<MovieDetails, number>({
      query: movieId => ({
        url: `movie/${movieId}`,
        params: {
          language: 'es-ES',
        },
      }),
    }),
  }),
});

export const { useGetPopularMoviesQuery, useGetMovieDetailsQuery } = tmdbApi;