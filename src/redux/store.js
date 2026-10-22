import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";

import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";

const storage = {
    getItem: (key) => {
        return Promise.resolve(window.localStorage.getItem(key));
    },
    setItem: (key, value) => {
        return Promise.resolve(window.localStorage.setItem(key, value));
    },
    removeItem: (key) => {
        return Promise.resolve(window.localStorage.removeItem(key));
    },
};

const persistSignInConfig = {
    key: "user",
    storage,
    whitelist: ['token']
};

const store = configureStore({
    reducer: {
        userState: persistReducer(persistSignInConfig, userReducer)
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

export default store;