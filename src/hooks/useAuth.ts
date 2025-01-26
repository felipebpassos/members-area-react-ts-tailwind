// hooks/useAuth.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthData, logout } from '../redux/slices/authSlice';
import { login, validateToken } from '../api/auth';
import { isValidEmail } from '../utils/validators';

const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Função para validar o token
  const checkAuth = async (token: string | null) => {
    if (token) {
      const isValid = await validateToken(token); // Valida o token com o backend
      if (isValid) {
        navigate('/dashboard'); // Redireciona para o Dashboard
      }
    }
  };

  // Função para realizar o login
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    setError(null);

    const result = await login(email, password);
    if (result) {
      const { token, user } = result;
      dispatch(setAuthData({ token, user })); // Armazena o token e o usuário no Redux
      navigate('/dashboard'); // Redireciona para o dashboard
    } else {
      setError('Credenciais inválidas');
    }
  };

  // Função de logout
  const handleLogout = () => {
    dispatch(logout()); // Limpa o token e os dados do usuário no Redux
    navigate('/'); // Redireciona para a página de login
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
    checkAuth, // Expor a função para a página de login
    handleLogout, // Expor a função de logout
  };
};

export default useAuth;
