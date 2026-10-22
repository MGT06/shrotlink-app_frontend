import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loggedUser: null,
    token: "",
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    error: null,
};

export const signInThunk = createAsyncThunk(
    "sign_in",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, payload)
            return response.data.results
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    },
);

export const signUpThunk = createAsyncThunk(
    "sign_up",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, payload)
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    },
);

export const logoutThunk = createAsyncThunk(
    "logout",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { token } = getState().userState;
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Logout failed");
        }
    },
);


const signInSlices = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.isRejected = false;
        }
    },
    extraReducers: (builder) => {
        return builder
            .addAsyncThunk(signInThunk, {
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                    state.error = null;
                },
                fulfilled: (state, { payload }) => {
                    state.token = payload.token;
                    state.isPending = false;
                    state.isFulfilled = true;
                },
                rejected: (state, { payload }) => {
                    state.isPending = false;
                    state.isRejected = true;
                    state.error = payload;
                },
            })
            .addAsyncThunk(signUpThunk, {
                pending: (state) => {
                    state.isPending = true;
                    state.isFulfilled = false;
                    state.isRejected = false;
                    state.error = null;
                },
                fulfilled: (state) => {
                    state.isPending = false;
                    state.isFulfilled = true;
                },
                rejected: (state, { payload }) => {
                    state.isPending = false;
                    state.isRejected = true;
                    state.error = payload;
                },
            })
            .addAsyncThunk(logoutThunk, {
                pending: (state) => {
                    state.isPending = true;
                },
                fulfilled: (state) => {
                    state.loggedUser = null;
                    state.token = "";
                    state.isPending = false;
                    state.isFulfilled = false;
                    state.isRejected = false;
                    state.error = null;
                },
                rejected: (state, { payload }) => {
                    state.loggedUser = null;
                    state.token = "";
                    state.isPending = false;
                    state.error = payload;
                },
            });
    }
});

export default signInSlices.reducer;
export const { clearError } = signInSlices.actions;
