// Em vez de process.env.REACT_APP_BASE_URL, use process.env.VITE_BASE_URL
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://ultimatemembers-api-rest-node.onrender.com:3000/api/v1.0'; // Valor padrão

export default BASE_URL;
