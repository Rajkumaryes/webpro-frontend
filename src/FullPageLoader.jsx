import React from 'react';
import "./FullPageLoader.css";
import logo from './assets/logos/Hapag-logo.png';
import logo1 from './assets/logos/Webpro-Login-Logo.jpg';
import logo2 from './assets/logos/Webpro-Logo.png';
import logo3 from './assets/logos/white-full.svg';

const MilestoneLoader = () => {
  return (
    <div className="milestone-loader">
      <div className="orbit-wrapper">
        <img src={logo} alt="Main Logo" className="main-logo" />
        <img src={logo1} alt="Mini" className="orbit-logo orbit1" />
        <img src={logo2} alt="Mini" className="orbit-logo orbit2" />
        <img src={logo3} alt="Mini" className="orbit-logo orbit3" />
      </div>
      <p className="loader-message">Aligning your goals...</p>
    </div>
  );
};

export default MilestoneLoader;
