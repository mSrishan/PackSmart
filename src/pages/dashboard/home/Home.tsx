import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const handleLogout = async () => {
    auth()
      .signOut()
      .then(() => {
        console.log('Logout successful');
      })
      .catch(e => {
        console.log('Logout error : ', e);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to PackSmart</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ec1b70', // Modern primary color
    paddingVertical: 14,
    paddingHorizontal: 100,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
