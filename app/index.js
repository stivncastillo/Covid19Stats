import React from 'react';
import Navigation from './config/navigation';
import ThemeManager from './utils/ThemeContext';

import CountryState from './context/country/CountryState';
import StatsState from './context/stats/StatsState';
import NewsState from './context/news/NewsState';


export default () => (
  <ThemeManager>
    <CountryState>
      <StatsState>
        <NewsState>
          <Navigation />
        </NewsState>
      </StatsState>
    </CountryState>
  </ThemeManager>
);
