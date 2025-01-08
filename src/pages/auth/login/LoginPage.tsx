import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const LoginPage = ({navigation}: {navigation: any}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        Alert.alert('Success', 'Logged in successfully!');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  const navigateToRegistration = () => {
    navigation.navigate('Registration'); // Correct route name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PackSmart</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Username (Email)"
        placeholderTextColor="#a1a1a1"
        autoCapitalize="none"
        value={username}
        onChangeText={text => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#a1a1a1"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text style={styles.link} onPress={navigateToRegistration}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#6c757d',
  },
  link: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});

export default LoginPage;
