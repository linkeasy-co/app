import React from 'react';
import '../styles/Header.scss'; // Importando os estilos SCSS
import logo from '../images/image.png'; // Importando a imagem do logo
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = ({ darkMode, toggleTheme, isAuthenticated }) => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="LinkEasy Logo" className="logo-img" />
      </div>
      <nav className="nav">
        <ul>
          {isAuthenticated && (<li><a href="/dashboard">Meus Posts</a></li>)}
          {isAuthenticated && (<li><a href="/profile">Perfil</a></li>)}
          {isAuthenticated && (<li><a href="/logout">Sair</a></li>)}
          {!isAuthenticated && (<li><a href="/login">Login</a></li>)}
          <li>
            <button onClick={toggleTheme} className="theme-toggle-btn">
              {darkMode ? <FaSun /> : <FaMoon />} {/* Ícone de sol para modo escuro e lua para modo claro */}
            </button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
