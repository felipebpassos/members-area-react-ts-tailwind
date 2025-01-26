import axios from 'axios';
import BASE_URL from '../config';
import { store } from '../redux/store'; // Importa a store
import { setModules, setLessonsByModule, setLoaded } from '../redux/slices/moduleSlice'; // Actions do Redux

export interface Module {
    id: number;
    title: string;
    description: string;
    cover_url: string;
    video_cover_url: string;
}

export interface Lesson {
    id: number;
    title: string;
    description: string;
    platform: string;
    video: string;
}

const apiClient = axios.create({
    baseURL: BASE_URL,
});

// Intercepta as requisições para incluir o token
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

// Função para buscar a lista de módulos
export const fetchModules = async (): Promise<void> => {
    try {
        const state = store.getState();

        // Não faz o fetch se os módulos já estiverem carregados
        if (state.module.loaded) return;

        const response = await apiClient.get<Module[]>('/modules/');
        store.dispatch(setModules(response.data)); // Atualiza os módulos no Redux
        store.dispatch(setLoaded(true)); // Marca os módulos como carregados
    } catch (error) {
        console.error('Erro ao obter módulos:', error);
    }
};

// Função para buscar as aulas de um módulo específico
export const fetchLessonsByModule = async (moduleId: number): Promise<void> => {
    try {
        const state = store.getState();

        // Verifica se as aulas para este módulo já foram carregadas
        if (state.module.lessonsByModule[moduleId]) {
            console.log('Aulas já carregadas para este módulo');
            return; // Se já estiver carregado, não faz o fetch
        }

        const response = await apiClient.get<Lesson[]>(`/modules/${moduleId}/lessons`);

        // Atualiza o Redux com as aulas
        store.dispatch(setLessonsByModule({ moduleId, lessons: response.data }));
    } catch (error) {
        console.error('Erro ao obter as aulas do módulo:', error);
    }
};
