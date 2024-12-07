import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../services/api';
import '../styles/Profile.scss';
import TagSelector from '../components/TagSelector';
import UserInfo from '../components/UserInfo';
import LinkedInIntegrationButton from '../components/LinkedInIntegrationButton';
import Tabs from '../components/Tabs';
import NewSchedulePicker from '../components/NewSchedulePicker';
import { SnackbarProvider, useSnackbar } from '../components/SnackBar';
import ButtonSubmit from '../components/ButtonSubmit';

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
  const { showSnackbar } = useSnackbar();

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
    window.location.href = process.env.REACT_APP_API_URL_LINK;
  };

  const handleCreateTags = (inputValue) => {
    const newTag = { label: inputValue, value: inputValue };
    setSelectedTags([...selectedTags, newTag]);
  };

  const handleChangeTags = (newValue) => {
    setSelectedTags(newValue || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstDay || !firstTime || !secondDay || !secondTime) {
      showSnackbar('Selecione os dias e horários');
      return;
    }

    if (selectedTags.length === 0) {
      showSnackbar('Selecione pelo menos uma tag');
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


      showSnackbar('Perfil atualizado com sucesso!', 'success');

    } catch (error) {
      SnackbarProvider('Erro ao atualizar o perfil. Tente novamente.');
    }
  };

  if (!user) {
    return <p>Carregando...</p>;
  }

  // Conteúdo das abas
  const tabs = [
    // {
    //   label: 'Informações Pessoais',
    //   content: <UserInfo email={user.email} name={user.name} profession={user.profession} />,
    // },
    {
      label: 'Dias e Horários',
      content: (
        <NewSchedulePicker
          daysOfWeek={daysOfWeek}
          firstDay={firstDay}
          firstTime={firstTime}
          secondDay={secondDay}
          secondTime={secondTime}
          setFirstDay={setFirstDay}
          setFirstTime={setFirstTime}
          setSecondDay={setSecondDay}
          setSecondTime={setSecondTime}
        />
      ),
    },
    {
      label: 'Integração com LinkedIn',
      content: (
        <LinkedInIntegrationButton onClick={handleLinkedInIntegration} />
      ),
    },
    {
      label: 'Tags',
      content: (
        <TagSelector
          selectedTags={selectedTags}
          onChangeTags={handleChangeTags}
          onCreateTag={handleCreateTags}
        />
      ),
    },
  ];

  return (
    <div className="profile-container"> 
      <h2>Olá, {user.name}!</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Tabs tabs={tabs} />
      <form onSubmit={handleSubmit}>
        <div className="button-group">
          <ButtonSubmit title='Salvar' />
        </div>
      </form>
    </div>
  );
};

export default Profile;
