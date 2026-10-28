import {
  ActivityIndicator,
  Button,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { useGetPopularMoviesQuery } from './src/services/tmdbApi';
import { store } from './src/store';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const { data, isLoading, isError, refetch } = useGetPopularMoviesQuery(1);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top,
          paddingBottom: safeAreaInsets.bottom,
          paddingLeft: safeAreaInsets.left + 16,
          paddingRight: safeAreaInsets.right + 16,
        },
      ]}>
      <Text style={styles.heading}>Películas populares</Text>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          accessibilityLabel="Cargando películas"
        />
      ) : isError ? (
        <View>
          <Text style={styles.message}>No pudimos cargar las películas.</Text>
          <Button title="Reintentar" onPress={() => refetch()} />
        </View>
      ) : (
        <FlatList
          data={data?.results ?? []}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Text style={styles.movieTitle}>{item.title}</Text>
          )}
          ListEmptyComponent={
            <Text style={styles.message}>No hay películas disponibles.</Text>
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
  movieTitle: {
    fontSize: 16,
    color: '#17202A',
    paddingVertical: 12,
  },
  message: {
    fontSize: 16,
    color: '#17202A',
    marginVertical: 16,
  },
});

export default App;
