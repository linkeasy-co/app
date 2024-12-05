import '../styles/ButtonSubmit.scss';

const ButtonSubmit = ({title, className, loading, ...props}) => {
return <button type='submit' className={`button-submit ${className}`} disable={loading} {...props}>
    {loading ? <div className="spinner"></div> : title}
  </button>
}

export default ButtonSubmit