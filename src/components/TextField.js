import React from 'react';
import '../styles/TextField.scss'; // Importar o CSS

const TextField = ({ label, name = '', value, onChange, placeholder, type = 'text', error }) => {
  return (
    <div className="text-field">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`text-input ${error ? 'input-error' : ''}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default TextField;
