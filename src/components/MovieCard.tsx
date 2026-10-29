import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

export function MovieCard({ movie, onPress }: MovieCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalle de ${movie.title}`}>
      {movie.poster_path ? (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
          }}
          style={styles.poster}
          resizeMode="cover"
          accessibilityLabel={`Póster de ${movie.title}`}
        />
      ) : (
        <View style={[styles.poster, styles.placeholder]}>
          <Text style={styles.placeholderText}>Sin imagen</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>

        <Text style={styles.rating}>
          ★ {movie.vote_average.toFixed(1)} / 10
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#F3F5F7',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  poster: {
    width: 96,
    height: 144,
    backgroundColor: '#E2E6EA',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#52606D',
    fontSize: 12,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#17202A',
  },
  rating: {
    marginTop: 10,
    fontSize: 14,
    color: '#52606D',
  },
});