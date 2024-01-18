import type {
    CompositeNavigationProp,
    NavigationProp,
    ParamListBase,
    RouteProp,
  } from '@react-navigation/native';
  import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
  import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

  
  export type SignInNavigatorParamList = {
    navigation: NavigationProp<ParamListBase>;
  };

  export type HomeStackNavigatorParamList = {
    Home: undefined;
    Details: {
      id: string;
      text: string;
      completed: boolean;
    };
  };

  export type HomeScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<HomeStackNavigatorParamList, 'Details'>,
    BottomTabNavigationProp<BottomTabNavigatorParamList, 'Completed'>
  >;
  
  export type DetailsScreenRouteProp = RouteProp<
    HomeStackNavigatorParamList,
    'Details'
  >;

  export type BottomTabNavigatorParamList = {
    HomeStack: HomeStackNavigatorParamList;
    Completed: undefined;
    Settings: undefined;
  };