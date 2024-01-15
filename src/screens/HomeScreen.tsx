import { useState } from "react";
import { Animated, Button, LayoutAnimation, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../navigation/types/types'
import { v4 as uuidv4 } from 'uuid';
import React from "react";
import 'react-native-get-random-values';
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, deleteTask } from "../../store/actions/tasks";
import { RootState } from "../../store/reducers";
import { ADD_TASK } from "../../store/types";

type Props = {};
export interface IToDo {
    id: string;
    text: string;
    completed: boolean;
}

export function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const dispatch = useDispatch();
    const toDoList = useSelector((state: RootState) => state.tasks);
    const [value, setValue] = useState<string>("");

    const [error, showError] = useState<Boolean>(false);
    const [animationValues, setAnimationValues] = useState(toDoList.map(() => new Animated.Value(1)));

    const handleSubmit = (): void => {
        if (value.trim()) {
            const newTask = { id: uuidv4(), text: value, completed: false };
            dispatch(addTask(newTask));
            console.log(newTask);
            showError(false);
        }
        else
            showError(true);
        setValue("");
    };

    const toggleComplete = (task: IToDo): void => {
        if (task) {
            dispatch(updateTask({ ...task, completed: !task.completed }));
        }
    }

    const openTaskDetail = (task: IToDo): void => {
        navigation.navigate('Details', { id: task.id, text: task.text, completed: task.completed });
    }


    const removeItem = (id: string): void => {
        dispatch(deleteTask(id));
    };
    return (

        <View style={styles.container}>
            <Text style={styles.title}>Todo List</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="Enter your todo task"
                    value={value}
                    onChangeText={e => {
                        setValue(e);
                        showError(false);
                    }}
                    style={styles.inputBox}
                />
                <Button title="Add Task" onPress={handleSubmit} />
            </View>
            {error && (
                <Text style={styles.error}>Error: Input field is empty</Text>
            )}
            <Text style={styles.subtitle}>Your tasks: </Text>
            {toDoList.length === 0 && <Text>No to do task available</Text>}
            {toDoList.map((toDo: IToDo, index: number) => (
                <Animated.View
                    style={{
                        opacity: animationValues[index],
                    }}
                    key={`${index}_${toDo.text}`}
                >
                    <View style={styles.listItem} key={`${index}_${toDo.text}`}>
                        <Text
                            style={[
                                styles.task,
                                { textDecorationLine: toDo.completed ? "line-through" : "none" }
                            ]}
                            onPress={() => openTaskDetail(toDo)}
                        >
                            {toDo.text}
                        </Text>
                        <TouchableOpacity
                            style={styles.toggleButton}
                            onPress={() => { toggleComplete(toDo) }}
                        >
                            <Text>{toDo.completed ? "UnDo" : "Complete"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => { removeItem(toDo.id) }}
                        >
                            <Text>X</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            ))}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: "flex-start",
    },
    inputWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    },
    title: {
        fontSize: 40,
        marginBottom: 20,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    inputBox: {
        width: 250,
        borderColor: "purple",
        borderRadius: 8,
        borderWidth: 2,
        paddingLeft: 8
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 10,
        color: "purple",
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        marginBottom: 10,
    },
    addButton: {
        alignItems: "flex-end",
        backgroundColor: "purple",
    },
    toggleButton: {
        backgroundColor: "green",
        width: 100,
        padding: 10,
        alignSelf: "center",
    },
    deleteButton: {
        backgroundColor: "red",
        marginStart: 10,
        padding: 10
    },
    task: {
        flex: 1,
    },
    error: {
        color: "red",
    }

})