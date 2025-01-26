import axios from 'axios';
import BASE_URL from '../config'; // Assumindo que o BASE_URL está configurado em um arquivo config.ts
import { store } from '../redux/store'; // Importa a store
import { setBanners } from '../redux/slices/bannerSlice'; // Ação do Redux para armazenar os banners

export interface Banner {
  id: number;
  image_url: string;
  title: string;
  link: string;
}

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Intercepta as requisições para incluir o token, se disponível
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Função para buscar a lista de banners
export const fetchBanners = async (): Promise<void> => {
  try {
    const state = store.getState();

    // Verifica se os banners já foram carregados
    if (state.banner.loaded) return;

    const response = await apiClient.get<Banner[]>('/banners');
    console.log(response.data)
    store.dispatch(setBanners(response.data)); // Atualiza os banners no Redux
  } catch (error) {
    console.error('Erro ao obter banners:', error);
  }
};
