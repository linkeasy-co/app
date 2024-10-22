import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import '../styles/PaymentForm.scss'; // Importando o CSS estilizado
import { createCreditCard } from '../services/api';
import { useNavigate } from 'react-router-dom';

function PaymentForm(props) {
  const { user } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false); // Estado para feedback de carregamento
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage('Stripe não foi carregado corretamente.');
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    // Começa o processo de pagamento
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Criando um PaymentMethod no frontend
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[Erro]', error);
      setErrorMessage('Erro ao processar o pagamento: ' + error.message);
      setLoading(false);
      return;
    }

    try {
      const response = await createCreditCard({ paymentMethodId: paymentMethod.id, email: user.email });
      if (response.status !== 201) {
        throw new Error('Erro ao salvar o método de pagamento.');
      }
      navigate(`/success?email=${user.email}`); // Redireciona para a página de sucesso
      setSuccessMessage('Pagamento processado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o método de pagamento:', error);
      setErrorMessage('Erro ao salvar o método de pagamento.');
    } finally {
      setLoading(false); // Sempre para o carregamento
    }
  };

  return (
    <div className="payment-form-container">
      <h2>Pagamento Seguro</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Número do Cartão</label>
          <div className="stripe-card-element">
            <CardNumberElement />
          </div>
        </div>

        <div className="input-group">
          <label>Data de Validade</label>
          <div className="stripe-card-element">
            <CardExpiryElement />
          </div>
        </div>

        <div className="input-group">
          <label>CVC</label>
          <div className="stripe-card-element">
            <CardCvcElement />
          </div>
        </div>

        <button type="submit" disabled={!stripe || loading}>
          {loading ? <div className="loader"></div> : 'Pagar'}
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default PaymentForm;
