import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';
import { useGetMovieDetailsQuery } from '../services/tmdbApi';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetails'>;

export function MovieDetailsScreen({ route }: Props) {
  const insets = useSafeAreaInsets();
  const { movieId } = route.params;
  const { data, isLoading, isError, refetch } =
    useGetMovieDetailsQuery(movieId);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color="#17202A"
          accessibilityLabel="Cargando detalle"
        />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>No pudimos cargar el detalle.</Text>
        <Button title="Reintentar" onPress={() => refetch()} />
      </View>
    );
  }

  const imagePath = data.backdrop_path ?? data.poster_path;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: insets.bottom + 24,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      {imagePath ? (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w780${imagePath}`,
          }}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel={`Imagen de ${data.title}`}
        />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={styles.message}>Sin imagen disponible</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>

        <Text style={styles.rating}>
          ★ {data.vote_average.toFixed(1)} / 10
        </Text>

        <Text style={styles.label}>Estreno</Text>
        <Text style={styles.text}>
          {data.release_date || 'Fecha no disponible'}
        </Text>

        <Text style={styles.label}>Géneros</Text>
        <Text style={styles.text}>
          {data.genres.map(genre => genre.name).join(' · ') ||
            'Sin géneros disponibles'}
        </Text>

        <Text style={styles.label}>Sinopsis</Text>
        <Text style={styles.text}>
          {data.overview.trim() || 'Sin sinopsis disponible.'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#E2E6EA',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#17202A',
  },
  rating: {
    marginTop: 12,
    fontSize: 16,
    color: '#52606D',
  },
  label: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#17202A',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#52606D',
  },
  message: {
    fontSize: 16,
    color: '#52606D',
    textAlign: 'center',
    marginBottom: 16,
  },
});