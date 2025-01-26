// Em vez de process.env.REACT_APP_BASE_URL, use process.env.VITE_BASE_URL
const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://seu-backend.com/api'; // Valor padrão

export default BASE_URL;
