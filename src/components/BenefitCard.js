import '../styles/BenefitCard.scss';

const BenefitCard = ({ benefit }) => {
 return (
  <div className="card-container">
    <div className='card-image'>
      <img src={benefit.imageUrl} alt={benefit.alt} />
    </div>
    <div className='card-infos'>
      <h3>{benefit.title}</h3>
      <p>{benefit.description}</p>
    </div>
  </div>
 )
}

export default BenefitCard