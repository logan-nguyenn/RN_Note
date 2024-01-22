import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signOut } from "../../services/auth";
import { persistor } from "..";

export interface UserInfo {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}
export interface AuthState {
    isLoggedIn: boolean;
    user: UserInfo | null;
};

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
}

export const logout = createAsyncThunk('auth/logout', async () => {
    await persistor.purge();
    await AsyncStorage.clear();
    await signOut();
    return {
       isLoggedIn: false,
       user: null,
    };
   });
   

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {
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