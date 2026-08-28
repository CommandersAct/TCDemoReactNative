/**
 * Entry point: wraps the app in SafeAreaProvider + CommandersActInitProvider
 * (which bootstraps the CommandersAct SDKs, see src/context/CommandersActSDKInit)
 * and renders the tab navigator.
 */
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CommandersActInitProvider } from './src/context/CommandersActSDKInit';
import RootNavigator from './src/navigation/RootNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CommandersActInitProvider>
        <RootNavigator />
      </CommandersActInitProvider>
    </SafeAreaProvider>
  );
}

export default App;
