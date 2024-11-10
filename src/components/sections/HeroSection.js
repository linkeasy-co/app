import React from 'react';
import '../../styles/HeroSection.scss';
import { formatCurrency } from '../../utils/helpers';
import { OLD_PRICE, NEW_PRICE } from '../../utils/constants';
import ButtonDefault from '../ButtonDefault';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className='hero-section-container'>
      <div className='hero'>
        <div className='hero-title'>
          <h2>
            Automatiza agora suas <br />
            postagens no LinkedIn  
          </h2>
        </div>
        <div className='cta'>
          <p>De <span className='old-price'>{formatCurrency(OLD_PRICE)}</span></p>
          <p>Por apenas <span className='new-price'>{formatCurrency(NEW_PRICE)}</span> por mês</p>
        </div> 
        <ButtonDefault title='Assine agora' icon={FaArrowRight} onClick={() => navigate('/compra')} className='lg animation' />
      </div>

      <div className='slog'>
        <p>Linkeasy usa IA para transformar você em uma referência no LinkedIn, criando conteúdos
        personalizados para você. Sua presença ativa e estratégica na maior rede de negócios.</p>
      </div>
      
    </div>
  )
}

export default HeroSection;