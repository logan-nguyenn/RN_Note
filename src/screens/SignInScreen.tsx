import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { FIREBASE_IOS_KEY, FIREBASE_WEB_KEY } from '@env';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/slices/auth';
import { RootState } from '../store/slices';
import { AppDispatch } from '../store';
import { configureGoogleSignin, signInWithGoogle } from '../services/auth';
import { useNavigation } from '@react-navigation/native';
import { SignInScreenNavigationProp } from '../navigation/types/types';


const SignInScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<SignInScreenNavigationProp>(); 

    useEffect(() => {
        configureGoogleSignin()
        const user = auth().currentUser;
    }, []);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            if (user) {
                const userInfo = {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                }
                dispatch(login({ user: userInfo, isLoggedIn: true }));
                navigation.navigate('Main');
            }
        });
        return subscriber; // unsubscribe on unmount
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signInWithGoogle}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SignInScreen;
