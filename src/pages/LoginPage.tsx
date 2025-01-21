import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken } from '../redux/slices/authSlice';
import InputField from '../components/InputField'; // Importando o novo componente
// import { validateToken } from '../api/auth'; // Função para validar o token
import { isValidEmail } from '../utils/validators';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Pegando o token do Redux
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    const checkAuth = async () => {
      // Verificar se o token já está no Redux
      console.log(token)
      if (token) {
        // const isValid = await validateToken(token); // Valida o token com o backend
        const isValid = true;
        if (isValid) {
          // Redireciona para o Dashboard se o usuário já estiver logado
          navigate('/dashboard');
        }
      }
    };

    checkAuth();
  }, [token, navigate]);

  const handleLogin = () => {
    if (!email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Por favor, insira um email válido.');
      return;
    }

    const fakeToken = 'fake-jwt-token';

    dispatch(setAuthToken(fakeToken));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Logo acima do formulário */}
      <img
        src="/logo.png" // Coloque o caminho correto da sua imagem
        alt="Logo"
        className="mb-6 w-32 h-auto" // Ajuste o tamanho conforme necessário
      />

      {/* Container de Login */}
      <div className="bg-white p-12 rounded shadow-md w-full max-w-sm">
        {/* Usando o componente de input personalizado */}
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-black text-white p-3 mt-2 rounded hover:bg-opacity-80"
          onClick={handleLogin}
        >
          Entrar
        </button>
      </div>

      {/* Footer com copyright fixado no fundo */}
      <footer className="fixed bottom-0 left-0 w-full text-dark py-6">
        <div className="flex justify-center">
          <span className="text-center text-sm">
            &copy;<a href="https://simplifyweb.com.br" className="text-darker">SimplifyWeb</a>, all rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
