// import React, { useMemo } from 'react';
// import { CardStyleInterpolators, StackNavigationOptions } from '@react-navigation/stack';
// import { createStackNavigator } from '@react-navigation/stack';
// import Home from './Home';
// import My from './My';
// import { useNavigationHorizontalInterpolator } from '../hooks';

// const Stack = createStackNavigator();

// export default function MyNavigator() {
//   const interpolator = useNavigationHorizontalInterpolator();
//   const leftOption = useMemo<StackNavigationOptions>(
//     () => ({
//       gestureDirection: 'horizontal-inverted',
//       CardStyleInterpolator: interpolator,
//     }),
//     [],
//   );
//   const rightOption = useMemo<StackNavigationOptions>(
//     () => ({
//       gestureDirection: 'horizontal',
//       CardStyleInterpolator: interpolator,
//     }),
//     [],
//   );

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="My" component={My} />
//     </Stack.Navigator>
//   );
// }
