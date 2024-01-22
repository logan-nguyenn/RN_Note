import { NavigationContainer, RouteProp, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, IToDo } from './src/screens/HomeScreen'
import TaskDetail from "./src/screens/TaskDetail";
import React from "react";
import { Provider, useSelector } from 'react-redux';
import store, { persistor } from './src/store';
import SignInScreen from "./src/screens/SignInScreen";
import { PersistGate } from "redux-persist/integration/react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingScreen from "./src/screens/SettingScreen";
import { RootState } from "./src/store/slices";
import { RootStackParamList } from "./src/navigation/types/types";

const AppStack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppStack.Navigator>
            <AppStack.Screen
              name="SignIn"
              component={SignInScreen}
            />
            <AppStack.Screen
              name="Main"
              component={MainTabs}
              options={{
                headerShown: false,
              }} 
            />
          </AppStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false ,}}>
      <Tab.Screen name="HomeTab" component={HomeTab} options={{ tabBarLabel: 'Home' }}>
      </Tab.Screen>
      <Tab.Screen name="SettingsTab" component={SettingTab} options={{ tabBarLabel: 'Settings' }}>
      </Tab.Screen>
    </Tab.Navigator>
  )
}

function HomeTab() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen}
        options={{
          headerBackVisible: false,
        }} />
      <HomeStack.Screen name="Details" component={TaskDetail} />
    </HomeStack.Navigator>
  )
}

function SettingTab() {
  return (
    <SettingStack.Navigator initialRouteName="Setting">
      <SettingStack.Screen name="Setting" component={SettingScreen} />
    </SettingStack.Navigator>
  )
}
