import React, { useEffect, useState } from 'react';
import '../styles/Checkout.scss'; // Agora estamos importando o arquivo SCSS
import { createUserLead } from '../services/api';
import PaymentForm from '../components/PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import TextField from '../components/TextField'; // Importando o componente TextField
import { formatPhone, validateEmail, validatePhone } from '../utils/validations';
import { useSnackbar } from '../components/SnackBar';
import ButtonSubmit from '../components/ButtonSubmit';

const Checkout = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false)
  const { showSnackbar } = useSnackbar();

  const handleCheckout = async () => {
    setLoading(true); 
    try {
      const response = await createUserLead({ email, name, profession, phone });
      if (response) {
        setConfirmationCode(response.confirmationCode);
        setStep(2); // Só avançar para o passo 2 após resposta bem-sucedida
      }
    } catch (error) {
      showSnackbar(error.message);
    } finally {
      setLoading(false); 
    }
  };

  const handleConfirmationCode = async () => {
    try {
      if (code !== confirmationCode) {
        throw new Error("Código de verificação inválido");
      }
      setStep(3);
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  useEffect(() => {
    if (phone) formatPhone(phone) && setPhone(formatPhone(phone));
    setError({ email: email && !validateEmail(email) ? 'Email inválido' : null, phone: phone && !validatePhone(phone) ? 'Celular inválido' : null });
  }, [email, name, profession, phone]);

  return (
    <div className='container'>
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
                placeholder="(00) 12345-6789"
                required
                error={error.phone}
              />

              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@email.com"
                required
                error={error.email}
              />

              <ButtonSubmit title="Ir para pagamento" loading={loading}/>
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
    </div>
    
  );
};

export default Checkout;
