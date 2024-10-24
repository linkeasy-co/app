import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/Success.scss';
import SchedulePicker from '../components/SchedulePicker';
import TextField from '../components/TextField';
import { postUserForm } from '../services/api';
import { useLocation } from 'react-router-dom';
import SelectList from '../components/SelectList';
import { useSnackbar } from '../components/SnackBar';

const Success = () => {
  const [userForm, setUserForm] = useState({ postReview: 'Não', goal: '', segment: '', position: '', preThemes: '', voice: '', belief: '', email: '', goalError: '', segmentError: '', positionError: '', preThemesError: '', voiceError: '', beliefError: '' });
  const [step, setStep] = useState(1);
  const location = useLocation();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromURL = queryParams.get('email');
    setUserForm({ ...userForm, email: emailFromURL });
  }, [location.search]);

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  }

  const handleSubmitForm = async () => {
    try {
      await postUserForm(userForm);
      setStep(8)
    } catch (error) {
      console.error('Erro ao definir a senha:', error);
    }
  }

  const handleError = (field, stp) => {
    if (userForm && userForm[field].length < 4) {
      showSnackbar('Campo obrigatório');
      return;
    }
    setStep(stp);
  }

  return (
    <div className="success-container">
      {step === 1 && (
        <>
          <h2>Qual é o seu objetivo principal ao usar o LinkedIn?</h2>

          <TextField
            type="text"
            value={userForm.goal}
            name="goal"
            onChange={(e) => handleChange(e)}
            required
            placeholder={"Oportunidade de emprego, Reforço da autoridade Outros (especifique)."}
            rows={4}
          />
          <button className="btn-stepper" onClick={() => { handleError('goal', 2) }} >Proxima pergunta</button>
        </>
      )}
      {step === 2 && (
        <>
          <h2>Qual é o seu setor de atuação e qual o seu cargo atual?</h2>

          <TextField
            type="text"
            name="segment"
            value={userForm.segment}
            onChange={(e) => handleChange(e)}
            required
            placeholder={"Marketing Digital, Gerente de Projetos"}
            rows={4}
            error={userForm && userForm?.segment.length < 4}
          />
          <TextField
            type="text"
            name="position"
            value={userForm.position}
            onChange={(e) => handleChange(e)}
            required
            placeholder={"Marketing, Desenvolvimento de Software"}
            rows={4}
            error={userForm && userForm?.position.length < 4}
          />
          <button onClick={() => { handleError('segment', 3) }} className="btn-stepper">Proxima pergunta</button>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Quais são os principais temas ou assuntos sobre os quais você gostaria de falar?</h2>

          <TextField
            type="text"
            name="preThemes"
            value={userForm.preThemes}
            onChange={(e) => handleChange(e)}
            required
            placeholder={"Inovação tecnológica, liderança..."}
            rows={4}
          />
          <button onClick={() => { handleError('preThemes', 4) }} className="btn-stepper">Proxima pergunta</button>
        </>
      )}
      {step === 4 && (
        <>
          <h2>Qual tom de voz você prefere usar em suas publicações?</h2>

          <TextField
            type="text"
            name="voice"
            value={userForm && userForm.voice}
            onChange={(e) => handleChange(e)}
            required
            placeholder={"Formal, Informal, Inspirador, Educacional..."}
            rows={4}
          />
          <button onClick={() => { handleError('voice', 5) }} className="btn-stepper">Proxima pergunta</button>
        </>
      )}
      {step === 5 && (
        <>
          <h2>Você tem algum valor ou crença pessoal que gostaria de refletir nos seus posts?</h2>

          <TextField
            type="text"
            name="belief"
            value={userForm.belief}
            onChange={(e) => handleChange(e)}
            required
            placeholder={"Valorização de diversidade, inovação, sustentabilidade, foco no cliente."}
            rows={4}
            error={userForm && userForm?.belief.length < 4}
          />
          <button onClick={() => { handleError('belief', 6) }} className="btn-stepper">Proxima pergunta</button>
        </>
      )}
      {step === 6 && (
        <>
          <h2>Você gostaria de revisar os posts antes de manda para o linkedin?</h2>
          <SelectList
            options={[{ label: 'Sim', id: true }, { label: 'Não', id: false }]}
            value={userForm.postReview}
            onChange={handleSelectChange}
            name='postReview'
          />
          <button onClick={() => { setStep(7) }} className="btn-stepper">Proxima pergunta</button>
        </>
      )}
      {step === 7 && (
        <>
          <h2>Prosseguir</h2>
          <button onClick={() => { handleSubmitForm(); }} className="btn-stepper">Criar senha!</button>
        </>
      )}
      {step === 8 && (
        <SchedulePicker />
      )}

    </div>
  );
};

export default Success;
