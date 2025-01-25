import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./slices/UserSlice";
import visaTypeSlice from "./slices/VisaTypeSlice";
import visaSlice from "./slices/Visas";
import visaRequestsReducer from "./slices/VisaRequest";
import BlogSlice from "./slices/BlogSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  visaType: visaTypeSlice,
  visas: visaSlice,
  visaRequest: visaRequestsReducer,
  blogSlice: BlogSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
