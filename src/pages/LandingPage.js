import React from 'react';
import '../styles/LandingPage.scss';
import HeroSection from '../components/sections/HeroSection';
import BenefitsSection from '../components/sections/BenefitsSection';

const LandingPage = () => {
  return (
    <div className='landing-container'>
      <HeroSection />
      <BenefitsSection />
    </div>
  )
}

export default LandingPage;
