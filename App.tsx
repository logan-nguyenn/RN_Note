import { NavigationContainer, RouteProp, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, IToDo } from './src/screens/HomeScreen'
import TaskDetail from "./src/screens/TaskDetail";
import React from "react";
import { Provider } from 'react-redux';
import store from './src/store';
import SignInScreen from "./src/screens/SignInScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={TaskDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}


