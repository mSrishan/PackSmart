import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginPage from './src/pages/auth/login/LoginPage';
import RegistrationPage from './src/pages/auth/registration/RegistrationPage';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/pages/dashboard/home/Home';
import CustomerManagement from './src/pages/dashboard/customer/CustomerManagement';
import ItemManagement from './src/pages/dashboard/item/ItemManagement';
import OrderManagement from './src/pages/dashboard/order/OrderManagement';
import PlaceOrder from './src/pages/dashboard/place-order/PlaceOrder';

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      console.log('User : ', user);
      setUser(user);
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {!user ? (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {backgroundColor: '#1E90FF'},
              headerTintColor: '#fff',
              headerTitleStyle: {fontWeight: 'bold'},
            }}>
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{title: 'Login'}}
            />
            <Stack.Screen
              name="Registration"
              component={RegistrationPage}
              options={{title: 'Register'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#1E90FF',
              tabBarInactiveTintColor: '#aaa',
              tabBarLabelStyle: {fontSize: 12},
            }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Customer" component={CustomerManagement} />
            <Tab.Screen name="Item" component={ItemManagement} />
            <Tab.Screen name="Order" component={OrderManagement} />
            <Tab.Screen name="Place Order" component={PlaceOrder} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaView>
  );
};

export default App;
