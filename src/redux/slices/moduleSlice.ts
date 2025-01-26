// src/redux/slices/moduleSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Module, Lesson } from '../../api/modules'; // Importando os tipos de módulo e aula

interface ModuleState {
    modules: Module[]; // Lista de módulos
    loaded: boolean; // Flag para verificar se os dados de módulos foram carregados
    lessonsByModule: { [key: number]: Lesson[] }; // Módulos com suas respectivas aulas, agrupados por ID
}

const initialState: ModuleState = {
    modules: [],
    loaded: false,
    lessonsByModule: {},
};

const moduleSlice = createSlice({
    name: 'module',
    initialState,
    reducers: {
        setModules: (state, action: PayloadAction<Module[]>) => {
            state.modules = action.payload;
        },
        setLessonsByModule: (state, action: PayloadAction<{ moduleId: number; lessons: Lesson[] }>) => {
            state.lessonsByModule[action.payload.moduleId] = action.payload.lessons;
        },
        setLoaded: (state, action: PayloadAction<boolean>) => {
            state.loaded = action.payload;
        },
    },
});

export const { setModules, setLessonsByModule, setLoaded } = moduleSlice.actions;
export default moduleSlice.reducer;
