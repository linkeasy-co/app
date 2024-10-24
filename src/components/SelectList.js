import React from 'react';
import '../styles/SelectList.scss'; // Importar o CSS

const SelectList = ({ label, options, value, onChange, name = "" }) => {
  return (
    <div className="select-list">
      {label && <label>{label}</label>}
      <select name={name} value={value} onChange={onChange}>
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

};

export default SelectList;
