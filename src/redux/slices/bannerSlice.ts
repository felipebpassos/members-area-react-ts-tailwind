import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Banner } from '../../api/banners'; // Importando o tipo Banner

interface BannerState {
  banners: Banner[]; // Lista de banners
  loaded: boolean; // Flag para verificar se os banners foram carregados
}

const initialState: BannerState = {
  banners: [],
  loaded: false,
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    // Ação para definir os banners no estado
    setBanners: (state, action: PayloadAction<Banner[]>) => {
      state.banners = action.payload;
      state.loaded = true; // Marca como carregado quando os banners são atualizados
    },
    // Ação para resetar os banners
    resetBanners: (state) => {
      state.banners = [];
      state.loaded = false;
    },
  },
});

// Exportando as ações para uso
export const { setBanners, resetBanners } = bannerSlice.actions;

// Exportando o reducer para ser usado na store
export default bannerSlice.reducer;
