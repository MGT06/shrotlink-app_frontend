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


const signInSlices = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        return builder.addAsyncThunk(signInThunk, {
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
    }
});

export default signInSlices.reducer;
