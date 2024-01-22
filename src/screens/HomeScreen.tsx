import { useEffect, useState } from "react";
import { Animated, Button, Dimensions, LayoutAnimation, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { HomeTabNavigationProp } from '../navigation/types/types'
import { v4 as uuidv4 } from 'uuid';
import React from "react";
import 'react-native-get-random-values';
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, deleteTask, fetchTasks } from "../store/slices/tasks";
import { RootState } from "../store/slices";
import { AppDispatch } from "../store";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserId } from "../utils/session";

type Props = {};
export interface IToDo {
    id: string;
    text: string;
    completed: boolean;
    userId: string;
}

export function HomeScreen() {
    const navigation = useNavigation<HomeTabNavigationProp>();

    const dispatch = useDispatch<AppDispatch>();
    const toDos = useSelector((state: RootState) => state.tasks);
    const [newTodo, setNewTodo] = useState<string>("");
    const [userId, setUserId] = useState('');

    const [error, showError] = useState<Boolean>(false);
    const [animationValues, setAnimationValues] = useState(toDos.map(() => new Animated.Value(1)));


    useEffect(() => {
        const init = async () => {
            const storedUserId = await getUserId();
            setUserId(storedUserId); 
            if (storedUserId) {
                dispatch(fetchTasks(storedUserId));
            }
        };

        init();
    }, [dispatch]);

    const handleSubmit = async (): Promise<void> => {
        if (newTodo.trim()) {
            const userId = await AsyncStorage.getItem("userId") || '';
            const newTask = { id: uuidv4(), text: newTodo, completed: false, userId: userId };
            dispatch(addTask(newTask));
            showError(false);
        }
        else
            showError(true);
        setNewTodo("");
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
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="Enter your todo task"
                    value={newTodo}
                    onChangeText={e => {
                        setNewTodo(e);
                        showError(false);
                    }}
                    style={styles.inputBox}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
                    <Text style={styles.addText}>Add Task</Text>
                </TouchableOpacity>
            </View>
            {error && (
                <Text style={styles.error}>Error: Input field is empty</Text>
            )}
            <Text style={styles.subtitle}>Your tasks: </Text>
            {toDos.length === 0 && <Text>No to do task available</Text>}
            {toDos.map((toDo: IToDo, index: number) => (
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
                            <Ionicons
                                name="trash-outline"
                                size={20}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            ))}
        </View>
    )
}

const { width } = Dimensions.get('screen');

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
        width: width * 0.7,
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
        alignSelf: "center",
        backgroundColor: "purple",
        padding: 10,
        borderRadius: 5,
    },
    addText: {
        color: '#ffffff', 
        textAlign: 'center', 
        fontWeight: 'bold',
    },
    toggleButton: {
        backgroundColor: "green",
        padding: 10,
        alignSelf: "center",
    },
    deleteButton: {
        backgroundColor: "red",
        marginStart: 10,
        padding: 10,
        alignContent: "center"
    },
    task: {
        flex: 1,
        fontSize: 20,
    },
    error: {
        color: "red",
    }

})