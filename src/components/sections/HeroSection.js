import React from 'react';
import '../../styles/HeroSection.scss';

const HeroSection = () => {
  return (
    <div className='hero-section-container'>
      <div className='hero'>
        <img className='hero-image' alt='Celular aberto no linkedIn' src='/images/mockup.png'/>
        <div className='hero-title'>
          <h2>
            Menos tempo postando <br />
            mais tempo <span>se conectando</span>    
          </h2>
        </div>
      </div>
      <div className='slog'>
        <p>
          A única plataforma para automatizar <br />
          as suas postagens no <span>LinkedIn</span>
        </p>
      </div>
    </div>
  )
}

export default HeroSection;