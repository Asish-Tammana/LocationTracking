/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';
import Home from './Home';
import GeolocationComponent from './GeolocationComponent';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home}/>


      </Stack.Navigator>
    </NavigationContainer>
  )
}



const Login = (props) => {
  const name= "Harry"
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, color: 'black' }}>This is logo Page</Text>
      <Button title='Go to Home Page' onPress={() => props.navigation.navigate("Home", {name})} />
    </View>
  )
}

export default App;
