import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/UserContext'

import Button from './Button'

import './Sidebar.scss'

const Sidebar = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const handleSignOut = () => {
    logout();
    navigate('/')
  };

  return (
    <div className='sidebar-container'>
      <h1>Anime Facts API</h1>
      <div className="sign-out">
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
    </div>
  );
};

export default Sidebar;
