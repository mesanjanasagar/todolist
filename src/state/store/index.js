import authReducer from "../features/auth";
import todoReducer from "../features/todo";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const reducers = combineReducers({
    auth: authReducer,
    todos: todoReducer
})

const persistConfig = { key: "root", storage, version: 2 };
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});