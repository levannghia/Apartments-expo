import React, { useEffect, useState } from 'react';
import { Navigation } from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { myTheme } from './custom-theme';
import { AuthContext } from './context';
import * as SecureStore from 'expo-secure-store';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const user = await SecureStore.getItemAsync("user");
      if (user) setUser(JSON.parse(user))
    }

    getUser();
  }, [])
  return (
    <AuthContext.Provider value={{user, setUser}}>
      <QueryClientProvider client={queryClient}>
        <ApplicationProvider {...eva} theme={myTheme}>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </ApplicationProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
