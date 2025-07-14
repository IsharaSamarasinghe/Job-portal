import React from 'react';
import './TrustedBy.css';

import microsoftLogo from '../assets/microsoft.svg';
import walmartLogo from '../assets/walmart.svg';
import accentureLogo from '../assets/accenture.png';

function TrustedBy() {
  return (
    <div className="trusted">
      <p>Trusted by</p>
      <div className="logos">
        <img src={microsoftLogo} alt="Microsoft" />
        <img src={walmartLogo} alt="Walmart" />
        <img src={accentureLogo} alt="Accenture" />
      </div>
    </div>
  );
}

export default TrustedBy;
