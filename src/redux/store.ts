import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import moduleReducer from './slices/moduleSlice'; // Importando o moduleSlice
import bannerReducer from './slices/bannerSlice'; // Importando o bannerSlice

// Configuração do persist para o authReducer
const authPersistConfig = {
  key: 'auth',
  storage,
};

// Configuração do persist para o moduleReducer
const modulePersistConfig = {
  key: 'module',
  storage,
};

// Configuração do persist para o bannerReducer
const bannerPersistConfig = {
  key: 'banner',
  storage,
};

// Criando os reducers persistidos
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedModuleReducer = persistReducer(modulePersistConfig, moduleReducer);
const persistedBannerReducer = persistReducer(bannerPersistConfig, bannerReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    module: persistedModuleReducer,
    banner: persistedBannerReducer, // Adicionando o bannerSlice com persistência
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Desabilitando verificações de serializabilidade
    }),
});

const persistor = persistStore(store);

// Exportando o tipo do estado global
export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
