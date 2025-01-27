import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; // Importando o hook de autenticação
import { useSelector } from 'react-redux'; // Para acessar o estado do Redux
import { StringUtils } from '../../utils/stringHandlers';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { handleLogout } = useAuth(); // Usando o handleLogout do hook

  // Acessando o estado do Redux
  const user = useSelector((state: any) => state.auth.user);

  const handleMouseEnter = () => setDropdownOpen(true);
  const handleMouseLeave = () => setDropdownOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dashboard">
      {/* Header com padding lateral de 80px e position fixed */}
      <header className="text-white px-6 md:px-[70px] h-[72px] fixed w-full bg-black z-10 flex items-center">
        <div className="flex justify-between w-full items-center">
          {/* Logo dentro de um Link */}
          <Link to="/dashboard" className="inline-block">
            <img
              src="/logo_white.png" // Coloque o caminho correto da sua imagem
              alt="Logo"
              className="w-20 h-auto" // Ajuste o tamanho conforme necessário
            />
          </Link>

          {/* Perfil com dropdown */}
          <div
            className="relative flex items-center h-[72px] space-x-4 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Nome e foto arredondada */}
            <span className="text-white">{user ? StringUtils.getFirstName(user.name) : 'Username'}</span>
            <img
              src="/default.png" // Substitua pelo caminho correto da foto
              alt="User"
              className="w-10 h-10 rounded-full border border-gray-500"
            />

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full bg-black text-white py-2 w-40 rounded-b-lg">
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-400 hover:text-white"
                  onClick={handleLogout} // Chama a função de logout
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main com largura total e padding lateral de 80px */}
      <main className="flex-grow px-6 md:px-[70px] pt-[100px] pb-[160px]">
        {children}
      </main>

      {/* Footer com copyright */}
      <footer className="text-normal py-6 mt-auto">
        <div className="flex justify-center">
          <span className="text-center text-sm">
            &copy;<a href="https://simplifyweb.com.br" className="text-white">simplifyweb</a>, todos os direitos reservados.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
