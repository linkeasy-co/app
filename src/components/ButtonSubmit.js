import '../styles/ButtonSubmit.scss';

const ButtonSubmit = ({title, className, loading}) => {
return <button type='submit' className={`button-submit ${className}`} disable={loading}>
    {loading ? <div className="spinner"></div> : title}
  </button>
}

export default ButtonSubmit