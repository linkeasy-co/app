import '../styles/ButtonDefault.scss';

const ButtonDefault = ({title, icon: Icon, onClick, className}) => {
return <button className={`button-default ${className}`} onClick={onClick}>
    {title}
    {Icon && <Icon />}
  </button>
}

export default ButtonDefault