import axios from 'axios';
import BASE_URL from '../config';

interface TokenValidationResponse {
  isValid: boolean;
}

export const validateToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.post<TokenValidationResponse>(`${BASE_URL}/auth/validate-token`, { token });
    return response.data.isValid;
  } catch (error) {
    console.error('Erro ao validar o token:', error);
    return false; // Retorna falso em caso de erro
  }
};
