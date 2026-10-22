import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  links: [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const getLinksThunk = createAsyncThunk(
  "get_links",
  async (query, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().userState;
      const params = new URLSearchParams();
      
      if (query?.search) params.append("search", query.search);
      if (query?.sort) params.append("sort", query.sort);
      if (query?.page) params.append("page", query.page);
      if (query?.limit) params.append("limit", query.limit);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/links?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.results;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const createLinkThunk = createAsyncThunk(
  "create_link",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().userState;
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/links`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    return builder
      .addAsyncThunk(getLinksThunk, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
          state.error = null;
        },
        fulfilled: (state, { payload }) => {
          state.links = payload.links;
          state.isPending = false;
          state.isFulfilled = true;
        },
        rejected: (state, { payload }) => {
          state.isPending = false;
          state.isRejected = true;
          state.error = payload;
        },
      })
      .addAsyncThunk(createLinkThunk, {
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
      });
  },
});

export default linksSlice.reducer;
