// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Create a slice for initial state
import { createSlice } from '@reduxjs/toolkit';

const initialSlice = createSlice({
  name: 'initial',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  }
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['initial'] // What we want to persist
};

const rootReducer = {
  initial: persistReducer(persistConfig, initialSlice.reducer)
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export const { increment } = initialSlice.actions; 