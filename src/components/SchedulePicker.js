import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { completeUser } from '../services/api';
import '../styles/SchedulePicker.scss';
import TextField from './TextField';
import SelectList from './SelectList';

const daysOfWeek = [
  { value: 'monday', label: 'Segunda-feira' },
  { value: 'tuesday', label: 'Terça-feira' },
  { value: 'wednesday', label: 'Quarta-feira' },
  { value: 'thursday', label: 'Quinta-feira' },
  { value: 'friday', label: 'Sexta-feira' },
  { value: 'saturday', label: 'Sábado' },
  { value: 'sunday', label: 'Domingo' },
];

const SchedulePicker = () => {
  const [firstDay, setFirstDay] = useState('');
  const [secondDay, setSecondDay] = useState('');
  const [firstTime, setFirstTime] = useState('');
  const [secondTime, setSecondTime] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [email, setEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromURL = queryParams.get('email');
    setEmail(emailFromURL);
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem');
      return;
    }

    try {
      const response = await completeUser(email, password);
      localStorage.setItem('first_acess', true);
      if (response.message === 'Senha criada com sucesso!') {
        setSuccessMessage('Senha criada com sucesso! Você será redirecionado para o login.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Erro ao definir a senha:', error);
      setErrorMessage('Ocorreu um erro ao definir a senha. Tente novamente.');
    }
  };

  return (
    <div className="schedule-picker-container">
      <h2>Crie sua Senha</h2>
      <p>Complete seu cadastro criando uma senha e selecionando dias e horários para as postagens.</p>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />

        <TextField
          label="Confirme sua Senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme sua senha"
        />

        <h3 className="error-message">{errorMessage}</h3>
        <h3 className="success-message">{successMessage}</h3>

        <button type="submit" className="btn-primary">Salvar</button>
      </form>
    </div>
  );
};

export default SchedulePicker;
