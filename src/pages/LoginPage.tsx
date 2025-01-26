// pages/LoginPage.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import InputField from '../components/InputField'; // Importando o novo componente
import useAuth from '../hooks/useAuth'; // Hook de autenticação

const LoginPage: React.FC = () => {
  const { email, setEmail, password, setPassword, error, handleLogin, checkAuth } = useAuth();

  // Pegando o token do Redux
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    checkAuth(token); // Chama a função de verificação de token quando a página carrega
  }, [token, checkAuth]);

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

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

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
            &copy;<a href="https://simplifyweb.com.br" className="text-darker">SimplifyWeb</a>, todos os direitos reservados.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
