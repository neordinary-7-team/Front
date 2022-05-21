import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Login';
import Home from '../Home';

const Stack = createStackNavigator();
const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default MyStack;
