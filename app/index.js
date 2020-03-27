import React from 'react';
import Navigation from './config/navigation';
import ThemeManager from './utils/ThemeContext'

export default () => (
  <ThemeManager>
    <Navigation />
  </ThemeManager>
);
