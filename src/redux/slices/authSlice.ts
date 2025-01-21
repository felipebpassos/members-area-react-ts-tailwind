import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Ação para definir o token
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    // Ação para logout, removendo o token
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setAuthToken, logout } = authSlice.actions;

export default authSlice.reducer;
