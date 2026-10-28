import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MovieCard } from '../components/MovieCard';
import { useGetPopularMoviesQuery } from '../services/tmdbApi';

export function MoviesScreen() {
  const insets = useSafeAreaInsets();
  const { data, isLoading, isError, refetch } = useGetPopularMoviesQuery(1);

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
      <Text style={styles.heading}>Películas populares</Text>

      {isLoading ? (
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
          data={data?.results ?? []}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <MovieCard movie={item} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={styles.message}>
                No hay películas disponibles.
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
});