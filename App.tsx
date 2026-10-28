import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { MoviesScreen } from './src/screens/MoviesScreen';
import { store } from './src/store';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <MoviesScreen />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;