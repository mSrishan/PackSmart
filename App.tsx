import { Text, View } from 'react-native'
import React, { Component } from 'react'
import LoginPage from './src/pages/auth/login/LoginPage'
import { SafeAreaView } from 'react-native-safe-area-context'

export class App extends Component {
  render() {
    return (
      <SafeAreaView style={{height:'100%', padding: 8, backgroundColor:'white'}}>
        <LoginPage />
      </SafeAreaView>
    )
  }
}

export default App

