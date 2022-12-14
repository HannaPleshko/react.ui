import { resumeApi } from './api/ResumeApi';
import { skillApi } from './api/SkillApi';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import resumeReducer from './reducers/ResumeSlice';
import serviceReducer from './reducers/ServiceSlice';
import resumeUtilsReducer from './reducers/ResumeUtilsSlice';
import { errorsApi } from './api/ErrorsApi';

const rootReducer = combineReducers({
  resume: resumeReducer,
  service: serviceReducer,
  resumeUtils: resumeUtilsReducer,
  [errorsApi.reducerPath]: errorsApi.reducer,
  [skillApi.reducerPath]: skillApi.reducer,
  [resumeApi.reducerPath]: resumeApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [errorsApi.reducerPath, skillApi.reducerPath, resumeApi.reducerPath],
};

const persistedReducer = persistReducer<RootReducer>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([errorsApi.middleware, skillApi.middleware, resumeApi.middleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootReducer = ReturnType<typeof rootReducer>;
