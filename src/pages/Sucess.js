import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/Success.scss';
import SchedulePicker from '../components/SchedulePicker';

const Success = () => {

  return (
    <div className="success-container">
      <h2>Crie sua Senha</h2>
      <p>Complete seu cadastro criando uma senha e selecionando dias e horários para as postagens.</p>
      <SchedulePicker />
    </div>
  );
};

export default Success;
