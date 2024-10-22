import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../services/api';
import '../styles/Profile.scss';
import TagSelector from '../components/TagSelector';
import TextField from '../components/TextField'; // Componente TextField
import SelectList from '../components/SelectList'; // Componente SelectList

const daysOfWeek = [
  { value: 'monday', label: 'Segunda-feira' },
  { value: 'tuesday', label: 'Terça-feira' },
  { value: 'wednesday', label: 'Quarta-feira' },
  { value: 'thursday', label: 'Quinta-feira' },
  { value: 'friday', label: 'Sexta-feira' },
  { value: 'saturday', label: 'Sábado' },
  { value: 'sunday', label: 'Domingo' },
];

const Profile = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [firstDay, setFirstDay] = useState('');
  const [secondDay, setSecondDay] = useState('');
  const [firstTime, setFirstTime] = useState('');
  const [secondTime, setSecondTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
        }

        const data = await getProfile(token);
        setSelectedTags(data.tags);
        data.postSchedule.map((schedule, index) => {
          if (index === 0) {
            setFirstDay(schedule.day);
            setFirstTime(schedule.time);
          } else if (index === 1) {
            setSecondDay(schedule.day);
            setSecondTime(schedule.time);
          }
        });
        setUser(data);
      } catch (error) {
        console.error('Erro ao buscar o perfil:', error);
        setErrorMessage('Ocorreu um erro ao carregar o perfil. Tente novamente.');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLinkedInIntegration = () => {
    window.location.href = 'https://ebef-2804-7f0-9100-d805-21d2-e82f-3cc0-a932.ngrok-free.app/api/linkedin/auth';
  };

  const handleCreateTags = (inputValue) => {
    const newTag = { label: inputValue, value: inputValue };
    setSelectedTags([...selectedTags, newTag]);
  };

  const handleChangeTags = (newValue) => {
    setSelectedTags(newValue || []); // Atualiza as tags selecionadas
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstDay || !firstTime || !secondDay || !secondTime) {
      setErrorMessage('Selecione os dias e horários');
      return;
    }

    if (selectedTags.length === 0) {
      setErrorMessage('Selecione pelo menos uma tag');
      return;
    }

    try {
      const response = await updateProfile({
        date: [
          { day: firstDay, time: firstTime },
          { day: secondDay, time: secondTime },
        ],
        tags: selectedTags
      });

      if (response.message === 'Perfil atualizado com sucesso!') {
        setErrorMessage('Perfil atualizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      setErrorMessage('Ocorreu um erro ao atualizar o perfil. Tente novamente.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Perfil do Usuário</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {user ? (
        <div className="profile-details">
          <p>Email: {user.email}</p>
          <p>Nome: {user.name}</p>
          <p>Profissão: {user.profession}</p>

          <form onSubmit={handleSubmit}>
            <SelectList
              label="Primeiro Dia"
              options={daysOfWeek}
              value={firstDay}
              onChange={(e) => setFirstDay(e.target.value)}
            />

            <TextField
              label="Horário do Primeiro Dia"
              type="time"
              value={firstTime}
              onChange={(e) => setFirstTime(e.target.value)}
            />

            <SelectList
              label="Segundo Dia"
              options={daysOfWeek}
              value={secondDay}
              onChange={(e) => setSecondDay(e.target.value)}
            />

            <TextField
              label="Horário do Segundo Dia"
              type="time"
              value={secondTime}
              onChange={(e) => setSecondTime(e.target.value)}
            />

            <TagSelector
              selectedTags={selectedTags}
              onChangeTags={handleChangeTags}
              onCreateTag={handleCreateTags}
            />

            <div className="button-group">
              <button type="submit" className="btn-save">Salvar</button>
              <button onClick={handleLinkedInIntegration} className="btn-linkedin">Integrar com LinkedIn</button>
            </div>
          </form>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Profile;
