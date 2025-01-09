import React, { useEffect, useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginPage from './src/pages/auth/login/LoginPage';
import RegistrationPage from './src/pages/auth/registration/RegistrationPage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { Text } from 'react-native';


export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
            console.log("User : ",user);
      setUser(user);
    })
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
     {!user? ( <NavigationContainer>
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
      </NavigationContainer>) :
      (<Text style={{color:'black'}}>Home</Text>)
      }
    </SafeAreaView>
  );
};

export default App;
