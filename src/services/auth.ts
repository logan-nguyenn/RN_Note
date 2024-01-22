import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { FIREBASE_IOS_KEY, FIREBASE_WEB_KEY } from '@env';
import { Alert } from 'react-native';

export const configureGoogleSignin = () => {
    GoogleSignin.configure({
        webClientId: FIREBASE_WEB_KEY,
        iosClientId: FIREBASE_IOS_KEY,
    });
};

export const signInWithGoogle = async () => {
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

export const signOut = async () => {
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await auth().signOut();
    } catch (error) {
        console.error(error);
    }
};