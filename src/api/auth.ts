import axios from 'axios';
import BASE_URL from '../config';

// Função para validar o token (com token no cabeçalho e método GET)
export const validateToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/auth/validate-token`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        },
      }
    );
    // Retorna true se o status da resposta for 200
    return response.status === 200;
  } catch (error) {
    console.error('Erro ao validar o token:', error);
    return false; // Retorna falso em caso de erro
  }
};


// Interface para a resposta de login (token e dados do usuário)
interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

// Função para login
export const login = async (
  email: string,
  password: string
): Promise<{ token: string; user: LoginResponse['user'] } | null> => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_URL}/auth/login`, { email, password });
    return { token: response.data.token, user: response.data.user };
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return null; // Retorna null em caso de erro
  }
};

