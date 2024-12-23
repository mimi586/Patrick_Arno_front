import React from 'react';
import { BiMoney, BiAward, BiUser, BiHome } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import "../sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/login'); // Navigate to the login page
  };
  const handleContribuableClick = () => {
    navigate('/impots');
  };
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-logo'>
        <BiMoney className='sidebar-logo-icon' />
        <h2>DGI</h2>
      </div>

      <div className='sidebar-menu'>
        <div onClick={handleHomeClick} className='sidebar-item'>
          <BiHome className='sidebar-icon' />
          <span>Principale</span>
        </div>
        <div onClick={handleAdminClick} className='sidebar-item'>
          <BiAward className='sidebar-icon' />
          <span>Admin</span>
        </div>
        <div onClick={handleContribuableClick} className='sidebar-item'>
          <BiUser className='sidebar-icon' />
          <span>Contribuable</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
