import React from 'react';
import '../styles/UserInfo.scss';

const UserInfo = ({ email, name, profession }) => {
  return (
    <div className="user-info">
      <p>Email: {email}</p>
      <p>Nome: {name}</p>
      <p>Profissão: {profession}</p>
    </div>
  );
};

export default UserInfo;
