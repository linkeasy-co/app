import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveAuthToken } from '../services/api';

function LinkedInSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  // Função para pegar o token da URL
  const getTokenFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return { token: params.get('token'), userId: params.get('userId') };
  };

  useEffect(() => {
    const { token, userId } = getTokenFromUrl();

    if (token && userId) {
      // Armazene o token no localStorage ou em um estado global para uso posterior
      handleAuthToken(token, userId);
      localStorage.setItem('chooseDate', true)
      localStorage.removeItem('firstAcess')
      // Navegue para a página de perfil, dashboard, ou outro fluxo
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } else {
      // Se não houver token, redireciona para a página de login ou erro
      navigate('/login');
    }
  }, [location, navigate]);

  const handleAuthToken = async (token, userId) => {
    const userToken = localStorage.getItem('token');
    const data = await saveAuthToken(userToken, token, userId);
    localStorage.setItem('token', data.token);
  };

  return (
    <div>
      <h1>Sucesso!</h1>
      <p>Você foi autenticado com sucesso pelo LinkedIn. Redirecionando...</p>
    </div>
  );
}

export default LinkedInSuccess;
