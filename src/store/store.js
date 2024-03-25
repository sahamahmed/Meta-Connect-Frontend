// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

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
});

const persistor = persistStore(store);

export { store, persistor };
