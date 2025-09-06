import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import loadingReducer from './slice/loadingSlice';
import bookingReducer from './slice/bookingSlice';
import profileReducer from './slice/profileSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  booking: bookingReducer,
  profile: profileReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
