
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

// Criar uma instância do axiosInstance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Interceptor para tratar respostas 401
axiosInstance.interceptors.response.use(
  (response) => {
    // Se a resposta for bem-sucedida, retorna a resposta
    return response;
  },
  async (error) => {
    const navigate = useNavigate(); // Para redirecionamento
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      navigate('/login');
    }
    return Promise.reject(error);
  }
);

const getToken = async () => {
  return localStorage.getItem('token');
};

// Função para login
export const makelogin = async (body) => {
  const response = await axiosInstance.post(`${API_URL}/auth/login`, body);
  return response.data;
};

// Função para buscar perfil do usuário
export const getProfile = async () => {
  const response = await axiosInstance.get(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${await getToken()}` },
  });
  return response.data;
};

// Função para criar sessão de checkout no Stripe
export const createCreditCard = async (body) => {
  const response = await axiosInstance.post(`${API_URL}/payment/save-payment-method`, body);
  return { data: response.data, status: response.status };
};

export const createUserLead = async (body) => {
  try {
    console.log(API_URL)
    const response = await axiosInstance.post(`${API_URL}/auth/create-user-lead`, body);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Função para salvar configurações do usuário
export const saveSettings = async (settings) => {
  const response = await axiosInstance.post(`${API_URL}/settings/save`, settings, {
    headers: { Authorization: `Bearer ${await getToken()}` },
  });
  return response.data;
};

// Função para buscar detalhes da sessão de pagamento
export const getSessionDetails = async (sessionId) => {
  const response = await axiosInstance.get(`${API_URL}/payment/session/${sessionId}`);
  return response.data;
};

// Função para definir a senha do usuário
export const completeUser = async (email, password, date, tags) => {
  const response = await axiosInstance.post(`${API_URL}/auth/set-password`, {
    email,
    password,
    date,
    tags
  });
  return response.data;
};

export const saveAuthToken = async (userToken, token, userId) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/auth/integration`,
      { token, userId },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      });
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

export const updateProfile = async (body) => {
  const response = await axiosInstance.put(`${API_URL}/auth/update-user`, body, {
    headers: { Authorization: `Bearer ${await getToken()}` },
  });
  return response.data;
};

export const getPosts = async () => {
  try {

    const response = await axiosInstance.get(`${API_URL}/posts`, {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const postUserForm = async (body) => {
  const response = await axiosInstance.post(`${API_URL}/auth/post-user-form`, body, {
  });
  return response.data;
};

export const postPost = async (body) => {
  const response = await axiosInstance.post(`${API_URL}/posts`, body, {
    headers: { Authorization: `Bearer ${await getToken()}` },
  });
  return response.data;
}

export const getNewPost = async () => {
  const response = await axiosInstance.get(`${API_URL}/posts/new-message`, {
    headers: { Authorization: `Bearer ${await getToken()}` },
  });
  return response.data;
}
