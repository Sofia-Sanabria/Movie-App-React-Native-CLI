import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { Button, Text } from 'react-native';

import { MoviesScreen } from '../src/screens/MoviesScreen';

const mockPopularQuery = jest.fn();
const mockSearchQuery = jest.fn();
const mockRefetch = jest.fn();

jest.mock('../src/services/tmdbApi', () => ({
  useGetPopularMoviesQuery: () => mockPopularQuery(),
  useSearchMoviesQuery: () => mockSearchQuery(),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
}));

type Props = React.ComponentProps<typeof MoviesScreen>;

const navigation = {
  navigate: jest.fn(),
} as unknown as Props['navigation'];

let renderer: ReturnType<typeof TestRenderer.create> | undefined;

beforeEach(() => {
  jest.clearAllMocks();

  const query = {
    currentData: { results: [] },
    isError: false,
    isFetching: false,
    isUninitialized: false,
    refetch: mockRefetch,
  };

  mockPopularQuery.mockReturnValue(query);
  mockSearchQuery.mockReturnValue(query);
});

afterEach(() => {
  act(() => {
    renderer?.unmount();
  });

  renderer = undefined;
});

function renderScreen() {
  act(() => {
    renderer = TestRenderer.create(
      <MoviesScreen
        navigation={navigation}
        route={{ key: 'Movies', name: 'Movies' }}
      />,
    );
  });

  return renderer!;
}

test('muestra un mensaje cuando la lista está vacía', () => {
  const screen = renderScreen();

  expect(
    screen.root
        .findAllByType(Text)
        .some(element => element.props.children === 'No hay películas disponibles.'),
    ).toBe(true);
});

test('muestra el error y permite reintentar la consulta', () => {
  mockPopularQuery.mockReturnValue({
    currentData: undefined,
    isError: true,
    isFetching: false,
    isUninitialized: false,
    refetch: mockRefetch,
  });

  const screen = renderScreen();

  expect(
    screen.root
        .findAllByType(Text)
        .some(element => element.props.children === 'No pudimos cargar las películas.'),
    ).toBe(true);

  act(() => {
    screen.root.findByType(Button).props.onPress();
  });

  expect(mockRefetch).toHaveBeenCalledTimes(1);
});