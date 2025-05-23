import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Checkout from './pages/Checkout';
import Success from './pages/Sucess';
import Login from './pages/Login';
import Profile from './pages/Profile';
import LinkedInSuccess from './pages/LinkedInSuccess';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';

import './styles/App.scss';
import { makelogin } from './services/api';
import Logout from './pages/Logout';
import { SnackbarProvider } from './components/SnackBar';
import usePersistedTheme from './hooks/usePersistedTheme';

function App() {
  const [darkMode, setDarkMode] = usePersistedTheme('theme', true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    // Verificar se o token está no LocalStorage ao iniciar o app
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // Define como autenticado se o token existir
    }
  }, []);

  const login = async (credentials) => {
    const data = await makelogin(credentials); // Chama a função login
    localStorage.setItem('token', data.token); // Salva o token no localStorage
    localStorage.setItem('user', JSON.stringify(data.user)); // Salva o usuário no localStorage
    <Navigate to="/profile" />; // Salva o token no LocalStorage
    setIsAuthenticated(true); // Atualiza o estado de autenticação
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  // Componente de rota protegida
  const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token');
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
  };


  return (
    <SnackbarProvider>
      <div className={darkMode ? 'app dark' : 'app light'}>
        <Router>
          <Header toggleTheme={toggleTheme} darkMode={darkMode} isAuthenticated={isAuthenticated} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/compra" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/login" element={<Login login={login} />} />
            <Route path="/recover-password" element={<Login login={login} />} />
            <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
            <Route path="/linkedin/success" element={<LinkedInSuccess />} />
            <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </div>
    </SnackbarProvider>
  );
}

export default App;
