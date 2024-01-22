import type {
    CompositeNavigationProp,
    NavigationProp,
    ParamListBase,
    RouteProp,
  } from '@react-navigation/native';
  import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

  export type RootStackParamList = {
    SignIn: undefined;
    Main: undefined;
  };
  
  export type BottomTabParamList = {
    Home: undefined; 
    Settings: undefined;
  };
  
  export type HomeStackParamList = {
    Home: undefined;
    Details: {
      id: string;
      text: string;
      completed: boolean; 
    };
  };

  export type HomeTabNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;
  
  export type SettingStackParamList = {
    Settings: undefined;
  };

  export type SettingScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<SettingStackParamList, 'Settings'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export type SignInStackParamList = {
  SignIn: undefined;
};
export type SignInScreenNavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<SignInStackParamList, 'SignIn'>,
NativeStackNavigationProp<RootStackParamList>
>;

  