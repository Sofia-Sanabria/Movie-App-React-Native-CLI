import { Image, StyleSheet, Text, View } from 'react-native';

export function TmdbCredits() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Créditos</Text>

      <Image
        source={require('../assets/tmdb-logo.png')}
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="The Movie Database"
      />

      <Text style={styles.notice}>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#D5DCE2',
    alignItems: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#17202A',
    marginBottom: 16,
  },
  logo: {
    width: 180,
    height: 24,
    marginBottom: 12,
  },
  notice: {
    fontSize: 12,
    lineHeight: 18,
    color: '#52606D',
    textAlign: 'center',
  },
});