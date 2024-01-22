import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signOut } from "../../services/auth";
import { persistor } from "..";

const initialState: string = ''

export const logout = createAsyncThunk('auth/logout', async () => {
    await persistor.purge();
    await AsyncStorage.clear();
    await signOut();
    return '';
   });
   

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            AsyncStorage.setItem('userId', action.payload);
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout.fulfilled, (state, action) => {
          return action.payload;
        });
     },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;