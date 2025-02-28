import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InputField from '../components/InputField';
import useAuth from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const { email, setEmail, password, setPassword, error, handleLogin, checkAuth } = useAuth();
  const token = useSelector((state: any) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryError, setRecoveryError] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState('');
  const [showBanner, setShowBanner] = useState(window.innerWidth > window.innerHeight); // Oculta o banner se for retrato

  useEffect(() => {
    checkAuth(token);
  }, [token, checkAuth]);

  useEffect(() => {
    const handleResize = () => {
      setShowBanner(window.innerWidth > window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoginClick = async () => {
    setLoading(true);
    try {
      await handleLogin();
    } finally {
      setLoading(false);
    }
  };

  const validEmails = ['felipebpassos@gmail.com', 'admin@simplifyweb.com.br'];

  const handleRecoverySubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (validEmails.includes(recoveryEmail)) {
      setRecoverySuccess('E-mail de redefinição de senha enviado com sucesso.');
      setRecoveryError('');
      setTimeout(() => setRecoverySuccess(''), 5000);
    } else {
      setRecoveryError('Não existe uma conta com esse nome de usuário ou endereço de e-mail.');
      setRecoverySuccess('');
      setTimeout(() => setRecoveryError(''), 5000);
    }
    setRecoveryEmail('');
  };

  // Capturar tecla Enter e chamar a ação correta
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showRecovery) {
        handleRecoverySubmit();
      } else {
        handleLoginClick();
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Seção da Imagem (só exibe se showBanner for true) */}
      {showBanner && (
        <div className="banner-login w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/Banner.png')" }} />
      )}

      {/* Seção de Login */}
      <div className={`relative ${showBanner ? 'w-1/2' : 'w-full'} flex items-center justify-center p-12`}>
        <div className="w-full max-w-md bg-zinc-800 p-8 rounded-xl shadow-2xl">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/logo.png" alt="Logo" className="h-10" />
          </div>

          {showRecovery ? (
            // Formulário de Recuperação de Senha
            <form onSubmit={handleRecoverySubmit}>
              <div className="mb-4 text-white text-center">
                Por favor, insira seu e-mail abaixo. Você receberá um e-mail com instruções sobre como redefinir sua senha.
              </div>

              <InputField
                type="email"
                placeholder="Email"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
              />

              {recoveryError && <div className="text-red-400 text-sm mt-2">{recoveryError}</div>}
              {recoverySuccess && <div className="text-green-400 text-sm mt-2">{recoverySuccess}</div>}

              <button
                type="submit"
                className="w-full bg-primary text-white p-3 mt-4 rounded-lg hover:bg-primary transition-colors"
              >
                Enviar Instruções
              </button>
            </form>
          ) : (
            // Formulário de Login Original
            <>
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

              {error && <div className="text-red-400 text-sm mt-2">{error}</div>}

              <button
                className="w-full bg-primary text-white p-3 mt-4 rounded-lg hover:bg-primary transition-colors"
                onClick={handleLoginClick}
                disabled={loading}
              >
                {loading ? <span className="loader"></span> : 'Entrar'}
              </button>
            </>
          )}

          {/* Link de Troca entre Login/Recuperação */}
          <div className="text-center mt-2">
            <button
              className="text-white text-sm underline hover:opacity-80 transition-opacity"
              onClick={() => setShowRecovery(!showRecovery)}
            >
              {showRecovery ? 'Login' : 'Esqueceu sua senha?'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 text-center py-4 text-white">
          <p className="text-sm">© REC Viral, todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
