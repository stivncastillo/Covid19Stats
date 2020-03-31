import React from 'react';
import Navigation from './config/navigation';
import ThemeManager from './utils/ThemeContext';

import CountryState from './context/country/CountryState';
import StatsState from './context/stats/StatsState';


export default () => (
  <ThemeManager>
    <CountryState>
      <StatsState>
        <Navigation />
      </StatsState>
    </CountryState>
  </ThemeManager>
);
