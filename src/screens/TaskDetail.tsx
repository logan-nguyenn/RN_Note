import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { DetailsScreenRouteProp } from '../navigation/types/types';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { deleteTask, updateTask } from "../store/slices/tasks";
import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TaskDetail() {
    const navigation = useNavigation();
    const route = useRoute<DetailsScreenRouteProp>();
    const { id, text, completed } = route.params;
    const [value, setValue] = useState<string>(text);
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style = {{ flexDirection: "row" }}>
                    <Ionicons
                        name="trash-outline"
                        size={25}
                        color="black"
                        style={{ marginRight: 15 }}
                        onPress={handleDelete}
                    />
                    <Ionicons
                        name="checkmark"
                        size={25}
                        color="black"
                        onPress={() => handleUpdate(value)}
                    />
                </View>
        ),
    });
}, [navigation, value]);

    const handleDelete = () => {
       dispatch(deleteTask(id));
       navigation.goBack();
    }

    const handleUpdate = (updatedText: string) => {
       dispatch(updateTask({
           id,
           text: updatedText,
           completed: completed,
       }));
       navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                style={styles.input}
                multiline={true}
            />      
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        width: '90%',
        height: '50%',
        margin: 20,
        padding: 10,
        textAlignVertical: 'top',
    },
});