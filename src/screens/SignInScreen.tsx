import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { SignInNavigatorParamList } from '../navigation/types/types';
import { FIREBASE_IOS_KEY, FIREBASE_WEB_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/auth';


const SignInScreen: React.FC<SignInNavigatorParamList> = ({ navigation }) => {
    const [initializing, setInitializing] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: FIREBASE_WEB_KEY, 
            iosClientId: FIREBASE_IOS_KEY,
        });

        const subscriber = auth().onAuthStateChanged(async (user) => {
            if (user) {
                const userInfo = {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                }
                dispatch(login({user: userInfo, isLoggedIn: true}));
                navigation.navigate('Home');
            } else {
                setInitializing(false);
            }
        });
        return subscriber; // unsubscribe on unmount
    }, [initializing, navigation]);

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                Alert.alert('Sign in Error', error.message);
            } else {
                Alert.alert('Sign in Error', 'An unknown error occurred');
            }
        }
    };
    if (initializing) return null;
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
