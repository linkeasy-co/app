import React, { useState } from 'react';
import '../styles/Header.scss'; // Importando os estilos SCSS
import { FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ButtonDefault from './ButtonDefault';
import Logo from './Logo';

const Header = ({ darkMode, toggleTheme, isAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  return (
    <header className="header">
      <a className="logo" href="/">
        <Logo color={darkMode ? '#f4f4f4' : '#111111'} width='170px'/>
      </a>

      <button className={`menu-mobile-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
           <li className='login-theme-group'>
            {!isAuthenticated && <ButtonDefault className='mobile-btn md' title='Entrar' onClick={() => navigate('/login')}/>}
            <button onClick={toggleTheme} className="theme-toggle-btn">
              {darkMode ? <FaSun /> : <FaMoon />}  {/*Ícone de sol para modo escuro e lua para modo claro*/}
            </button>
            </li>
          {isAuthenticated && (<li><a href="/dashboard">Meus Posts</a></li>)}
          {isAuthenticated && (<li><a href="/profile">Perfil</a></li>)}
          {isAuthenticated && (<li><a href="/logout">Sair</a></li>)}
          {!isAuthenticated && (<li><a href="/">Sobre nós</a></li>)}
          {!isAuthenticated && (<li><a href="/">Serviços</a></li>)}
          {!isAuthenticated && (<li><a href="/">Preços</a></li>)}
          {!isAuthenticated && (<li><a href="/">Suporte</a></li>)}
        </ul>
      </nav>
      {!isAuthenticated && <ButtonDefault className='desktop-btn md' title='Entrar' onClick={() => navigate('/login')}/>}
    </header>
  );
};

export default Header;
