import React from 'react';
import { Navigation } from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { myTheme } from './custom-theme';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={myTheme}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ApplicationProvider>
  );
}
