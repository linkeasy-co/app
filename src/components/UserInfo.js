import React from 'react';
import '../styles/UserInfo.scss';
import UserSvg from './UserSvg';

const UserInfo = ({ email, name, profession }) => {
  return (
    <div className="user-info-container">
      <div>
        <UserSvg />
      </div>
      <div className="infos">
        <p className='name'>{name}</p>
        <p className='info'>{email}</p>
        <p className='info'> {profession}</p>
      </div>
    </div>
  );
};

export default UserInfo;
