import React, { useState } from 'react';
import '../styles/Checkout.scss'; // Agora estamos importando o arquivo SCSS
import { createUserLead } from '../services/api';
import PaymentForm from '../components/PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import TextField from '../components/TextField'; // Importando o componente TextField

const Checkout = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1);

  const handleCheckout = async () => {
    try {
      const response = await createUserLead({ email, name, profession, phone });
      if (response) {
        setStep(2); // Só avançar para o passo 2 após resposta bem-sucedida
      }
    } catch (error) {
      console.error('Erro no checkout:', error);
    }
  };

  return (
    <div className="checkout-container">
      {step === 1 && (
        <>
          <h2>Complete suas informações</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
            <TextField
              label="Nome Completo"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              required
            />

            <TextField
              label="Profissão"
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="Sua profissão"
              required
            />

            <TextField
              label="Celular"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Seu celular"
              required
            />

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email"
              required
            />

            <button type="submit" className="btn-primary">Ir para pagamento</button>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <Elements stripe={stripePromise}>
            <PaymentForm user={{ email, name, profession, phone }} />
          </Elements>
        </>
      )}
    </div>
  );
};

export default Checkout;
