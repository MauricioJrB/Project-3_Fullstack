import React from 'react';
import Sidebar from '../../components/Sidebar';
import Animes from '../../components/Animes';

import './Home.scss'

const Home = () => {
  return (
    <div>
      <div className="home-container">
        <Sidebar />
        <Animes />
      </div>
    </div>
  );
};

export default Home;
