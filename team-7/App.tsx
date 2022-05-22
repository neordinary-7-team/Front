import React, { useCallback, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler';
//prettier-ignore
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import 'react-native-gesture-handler';
import { ToggleThemeProvider } from './src/contexts';
import MainNavigator from './src/screen/MainNavigator';
import { RecoilRoot } from 'recoil';

enableScreens();

export default function App() {
  const scheme = useColorScheme(); //'dark' 혹은 'light'
  const [theme, setTheme] = useState(scheme === 'dark' ? DarkTheme : DefaultTheme);

  //prettier-ignore
  const toggleTheme = useCallback(() => setTheme(({dark}) => (dark ? DefaultTheme : DarkTheme)), []);

  return (
    <RecoilRoot>
      <AppearanceProvider>
        <ToggleThemeProvider toggleTheme={toggleTheme}>
          <SafeAreaProvider>
            <NavigationContainer theme={theme}>
              <MainNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </ToggleThemeProvider>
      </AppearanceProvider>
    </RecoilRoot>
  );
}
