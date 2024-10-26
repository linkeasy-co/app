import '../../styles/BenefitsSection.scss';
import { BenefitsData } from '../../utils/BenefitsData'
import BenefitCard from '../BenefitCard';

const BenefitsSection = () => {
  return(
    <div className='benefits-section-container'>
      <h2>Benefícios</h2>
      <div className="benefits-container">
        {BenefitsData.map((benefit) => (
          <BenefitCard benefit={benefit} />
        ))}
      </div>
    </div>
  )
}

export default BenefitsSection