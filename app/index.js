import React from 'react';
import Navigation from './config/navigation';
import ThemeManager from './utils/ThemeContext';

import CountryState from './context/country/CountryState';


export default () => (
  <ThemeManager>
    <CountryState>
      <Navigation />
    </CountryState>
  </ThemeManager>
);
