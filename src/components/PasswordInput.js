// src/components/PasswordInput.jsx
import React from 'react';

const PasswordInput = ({ password, confirmPassword, onPasswordChange, onConfirmPasswordChange }) => (
  <div>
    <div className="input-group">
      <label htmlFor="password">Senha</label>
      <input type="password" id="password" value={password} onChange={onPasswordChange} required />
    </div>

    <div className="input-group">
      <label htmlFor="confirmPassword">Confirme sua Senha</label>
      <input type="password" id="confirmPassword" value={confirmPassword} onChange={onConfirmPasswordChange} required />
    </div>
  </div>
);

export default PasswordInput;
