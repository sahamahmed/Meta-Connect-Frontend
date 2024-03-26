// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// Import your reducers
import authSlice from "./authSlice";
import postSlice from "./postSlice";
import businessSlice from "./businessSlice";

const persistConfig = {
  key: "root",
  storage,
  // Other options
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);
const persistedPostReducer = persistReducer(persistConfig, postSlice);
const persistedBusinessReducer = persistReducer(
  persistConfig,
  businessSlice
);

const rootReducer = {
  auth: persistedAuthReducer,
  post: persistedPostReducer,
  business: persistedBusinessReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
