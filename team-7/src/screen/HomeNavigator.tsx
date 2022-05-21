import React, { useMemo } from 'react';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import { useNavigationHorizontalInterpolator } from '../hooks';

const Stack = createStackNavigator();

export default function HomeNavigator() {
  const interpolator = useNavigationHorizontalInterpolator();
  const leftOption = useMemo<StackNavigationOptions>(
    () => ({
      gestureDirection: 'horizontal-inverted',
      CardStyleInterpolator: interpolator,
    }),
    []
  );
  const rightOption = useMemo<StackNavigationOptions>(
    () => ({
      gestureDirection: 'horizontal',
      CardStyleInterpolator: interpolator,
    }),
    []
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
