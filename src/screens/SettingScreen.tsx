import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/auth'; // Import the action to clear persist data
import { AppDispatch } from '../store';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { SettingScreenNavigationProp, SettingStackParamList } from '../navigation/types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function SettingScreen() {
 const dispatch = useDispatch<AppDispatch>();
 const navigation = useNavigation<SettingScreenNavigationProp>();

 const handleLogout = () => {
    dispatch(logout())
        .then(() => {
            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    { name: 'SignIn' },
                  ],
                })
              );
        });
 };

 return (
    <View style={styles.container}>
      <Button title="Sign out" onPress={handleLogout} />
    </View>
 );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});