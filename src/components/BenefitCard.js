import '../styles/BenefitCard.scss';

const BenefitCard = ({ benefit }) => {
  const Icon = benefit.icon
 return (
  <div className="card-container">
    <Icon className='benefit-icon'/>
    <div className='card-infos'>
      <h3>{benefit.title}</h3>
      <p>{benefit.description}</p>
    </div>
  </div>
 )
}

export default BenefitCard