import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Ação para definir o token e o usuário
    setAuthData: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    // Ação para logout, removendo o token e os dados do usuário
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setAuthData, logout } = authSlice.actions;

export default authSlice.reducer;
