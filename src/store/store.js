import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import chatSlice from "./chat-slice";
import lightDarkSlice from "./lightDark";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  chat: chatSlice.reducer,
  lightDark: lightDarkSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

let persistor = persistStore(store);

export { store, persistor };
