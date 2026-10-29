import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MovieDetailsScreen } from '../screens/MovieDetailsScreen';
import { MoviesScreen } from '../screens/MoviesScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#17202A',
        }}>
        <Stack.Screen
          name="Movies"
          component={MoviesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{ title: 'Detalle de película' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}