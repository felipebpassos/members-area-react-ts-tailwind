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

  // Estilos comuns para os links de navegação
  const navLinkStyle = `
    nav-link relative px-0 text-white uppercase text-sm font-medium 
    md:hover:text-primary transition-colors duration-300
    before:absolute before:bottom-0 before:left-0 
    before:w-0 md:before:h-[2px] before:bg-primary
    before:transition-all before:duration-300
    hover:before:w-full
  `;

  // Estilos comuns para os links de navegação
  const dropdownButtonStyle = `
    block w-full px-4 py-2 text-left text-sm text-gray-400 hover:text-white
  `;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dashboard">
      {/* Header com padding lateral de 80px e position fixed */}
      <header className="text-white px-6 md:px-[70px] h-[72px] fixed w-full bg-black z-10 flex items-center">
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <Link to="/dashboard" className="inline-block">
              <img
                src="/logo.png"
                alt="Logo"
                className="md:h-[30px] h-[24px]"
              />
            </Link>

            {/* Links de Navegação */}
            <nav className="flex items-center gap-8">

              <Link
                to="/dashboard"
              >
                <button className={navLinkStyle}>
                  <i className="fas fa-house md:mr-2" />
                  <span className="max-lg:hidden">Home</span>
                </button>
              </Link>

              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={navLinkStyle}>
                  <i className="fas fa-users md:mr-2"></i>
                  <span className="max-lg:hidden">Comunidade</span>
                </button>
              </a>
            </nav>
          </div>

          {/* Perfil com dropdown */}
          <div
            className="dropdown relative flex items-center h-[72px] space-x-4 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="text-white max-md:hidden">Olá, {user ? StringUtils.getFirstName(user.name) : 'Username'}</span>
            <img
              src="/default.png"
              alt="User"
              className="w-10 h-10 rounded-full border border-gray-500"
            />

            {isDropdownOpen && (
              <div className="absolute right-0 top-full bg-black text-white py-2 w-40 rounded-b-lg">
                <button
                  className={dropdownButtonStyle}
                  onClick={handleLogout}
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
