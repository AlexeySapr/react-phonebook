import { configureStore } from '@reduxjs/toolkit';
import { filter, themeMode } from './phonebook/phonebook-reducer';
import { authReducer } from './auth';
import { contactsApi } from 'services/contactsAPI';

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
import storage from 'redux-persist/lib/storage';

const phonebookPersistConfig = {
  key: 'themeMode',
  storage: storage,
  // whitelist: ['themeMode'],
};

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  // whitelist: ['themeMode'],
};

const store = configureStore({
  reducer: {
    filter,
    theme: persistReducer(phonebookPersistConfig, themeMode),
    auth: persistReducer(authPersistConfig, authReducer),
    [contactsApi.reducerPath]: contactsApi.reducer,
  },

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    contactsApi.middleware,
  ],
  devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

export { store, persistor };

// const rootReducer = combineReducers({
//   filter,
//   themeMode,
//   [contactsApi.reducerPath]: contactsApi.reducer,
// });

// const persistedReducer = persistReducer(phonebookPersistConfig, rootReducer);

// const rootReducer = combineReducers({
//   filter,
//   theme: persistReducer(phonebookPersistConfig, toggleTheme),
//   [contactsApi.reducerPath]: contactsApi.reducer,
// });
