import React from 'react';
import { Image } from 'react-native'

const HeaderStyle = (theme) => ({
  headerStyle: {
    backgroundColor: theme.background,
    shadowColor: 'transparent',
    elevation: 0,
    height: 100,
  },
  headerTintColor: theme.text,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: () => (
    <Image
      style={{ height: 40, width: 40}}
      resizeMode="contain"
      source={require('../../../assets/Logo.png')}
    />
  ),
  headerRightContainerStyle: {
    paddingHorizontal: 16,
  },
});

export default HeaderStyle;
