import React from 'react';
import '../styles/TextField.scss'; // Importar o CSS

const TextField = ({ label, type = 'text', value, onChange, placeholder }) => {
  return (
    <div className="text-field">
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextField;
