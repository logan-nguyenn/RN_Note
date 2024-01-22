import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserId = async () => {
  const userId = await AsyncStorage.getItem("userId");
  return userId || '';
};