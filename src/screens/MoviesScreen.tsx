import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { MovieCard } from '../components/MovieCard';
import {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
} from '../services/tmdbApi';
import { useState } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

type Props = NativeStackScreenProps<RootStackParamList, 'Movies'>;

export function MoviesScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const normalizedSearch = searchText.trim();
  const debouncedSearch = useDebouncedValue(normalizedSearch);
  const isSearching = normalizedSearch.length > 0;
  const isDebouncing = normalizedSearch !== debouncedSearch;

  const popularQuery = useGetPopularMoviesQuery(1, {
    skip: isSearching,
  });

  const searchQuery = useSearchMoviesQuery(debouncedSearch, {
    skip: !isSearching || isDebouncing || !debouncedSearch,
  });

  const activeQuery = isSearching ? searchQuery : popularQuery;
  const { currentData, isError, isFetching, isUninitialized, refetch } =
    activeQuery;

  const showLoading = isDebouncing || isFetching || isUninitialized;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 16,
          paddingRight: insets.right + 16,
        },
      ]}>
      <Text style={styles.heading}>
        {isSearching ? 'Buscar películas' : 'Películas populares'}
      </Text>

      <TextInput
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Buscar películas por nombre"
        placeholderTextColor="#687782"
        accessibilityLabel="Buscar películas por nombre"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />

      {showLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator
            size="large"
            color="#17202A"
            accessibilityLabel="Cargando películas"
          />
          <Text style={styles.message}>Cargando películas…</Text>
        </View>
      ) : isError ? (
        <View style={styles.centered}>
          <Text style={styles.message}>
            No pudimos cargar las películas.
          </Text>
          <Button title="Reintentar" onPress={() => refetch()} />
        </View>
      ) : (
        <FlatList
          data={currentData?.results ?? []}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() =>
                navigation.navigate('MovieDetails', { movieId: item.id })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={styles.message}>
                {isSearching
                  ? 'No encontramos películas con ese nombre.'
                  : 'No hay películas disponibles.'}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#17202A',
    marginVertical: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    fontSize: 16,
    color: '#52606D',
    textAlign: 'center',
    marginVertical: 16,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#D5DCE2',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#17202A',
    backgroundColor: '#F8F9FA',
  },
});