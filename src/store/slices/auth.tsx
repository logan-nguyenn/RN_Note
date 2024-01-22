import { User } from "@react-native-google-signin/google-signin";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    // Add other needed fields
}
export interface AuthState {
    isLoggedIn: boolean;
    user: UserInfo | null;
};

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {
            return action.payload;
        },
        logout: (state) => {
            return {
                isLoggedIn: false,
                user: null,
            };
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;