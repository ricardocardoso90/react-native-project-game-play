import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Routes } from './src/routes';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/hooks/auth';

import { Background } from './src/components/Background';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}
      onLayout={onLayoutRootView}
    >
      <Background>
        <StatusBar
          translucent
          barStyle="light-content"
        />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </Background>
    </GestureHandlerRootView>
  );
}
