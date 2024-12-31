import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginPage from './src/pages/auth/login/LoginPage';
import RegistrationPage from './src/pages/auth/registration/RegistrationPage';

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
    </SafeAreaView>
  );
};

export default App;
