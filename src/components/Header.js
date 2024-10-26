import React, { useState } from 'react';
import '../styles/Header.scss'; // Importando os estilos SCSS
import logo from '../images/image.png'; // Importando a imagem do logo
import { FaMoon, FaSun } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';

const Header = ({ darkMode, toggleTheme, isAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  return (
    <header className="header">
      <a className="logo">
        <img src={logo} alt="LinkEasy Logo" className="logo-img" href="/" />
      </a>

      <button className={`menu-mobile-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
           <li className='login-theme-group'>
            {!isAuthenticated && <a className='login-mobile' href="/login"> <FiUser /> Entrar</a>}
            <button onClick={toggleTheme} className="theme-toggle-btn">
              {darkMode ? <FaSun /> : <FaMoon />}  {/*Ícone de sol para modo escuro e lua para modo claro*/}
            </button>
            </li>
          {isAuthenticated && (<li><a href="/dashboard">Meus Posts</a></li>)}
          {isAuthenticated && (<li><a href="/profile">Perfil</a></li>)}
          {isAuthenticated && (<li><a href="/logout">Sair</a></li>)}
          {!isAuthenticated && (<li><a href="/logout">Sobre nós</a></li>)}
          {!isAuthenticated && (<li><a href="/logout">Serviços</a></li>)}
          {!isAuthenticated && (<li><a href="/logout">Preços</a></li>)}
          {!isAuthenticated && (<li><a href="/logout">Suporte</a></li>)}
        </ul>
      </nav>
      {!isAuthenticated && (<a className='login-btn' href="/login">Entrar</a>)}
    </header>
  );
};

export default Header;
