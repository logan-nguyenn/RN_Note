/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { firebase } from '@react-native-firebase/app';
import { FIREBASE_API_KEY } from '@env';

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    appId: "1:1040709611579:android:a93d65ac74eab70b79ac1e",
    databaseURL: "",
    messagingSenderId: "",
    projectId: "todo-950d1",
    storageBucket: "todo-950d1.appspot.com",
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase
        .initializeApp(firebaseConfig)
        .then(() => {
            AppRegistry.registerComponent(appName, () => App);
        })
        .catch((error) => {
            console.error("Error initializing Firebase: ", error);
        });
} else {
    AppRegistry.registerComponent(appName, () => App);
}