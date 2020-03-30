import React from 'react';
import { Image } from 'react-native'

const HeaderStyle = (theme) => ({
  headerStyle: {
    backgroundColor: theme.background,
    shadowColor: 'transparent',
    elevation: 0,
    height: 80,
  },
  headerTintColor: theme.text,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: () => (
    <Image
      style={{ height: 30, width: 30}}
      resizeMode="contain"
      source={require('../../../assets/Logo.png')}
    />
  ),
  headerRightContainerStyle: {
    paddingHorizontal: 16,
  },
});

export default HeaderStyle;
