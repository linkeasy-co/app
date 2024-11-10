import '../../styles/BenefitsSection.scss';
import { BenefitsData } from '../../utils/BenefitsData'
import BenefitCard from '../BenefitCard';

const BenefitsSection = () => {
  return(
    <div className='benefits-section-container'>
      <div className="benefits-container">
        <div className="title">
          <h2>Benefícios e vantagens</h2> 
        </div>
        {BenefitsData.map((benefit) => (
          <BenefitCard benefit={benefit} />
        ))}
      </div>
    </div>
  )
}

export default BenefitsSection