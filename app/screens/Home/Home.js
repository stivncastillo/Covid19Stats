import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Switch } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components/native'
import { useTheme } from '../../utils/ThemeContext'
import CountryContext from '../../context/country/countryContext';

const Home = ({ navigation }) => {
  const theme = useTheme();
  const countryContext = useContext(CountryContext);
  const { selectedCountry } = countryContext;

  if (selectedCountry === null) {
    navigation.navigate('SelectCountry');
  }

  return (
    <Container>
      <Switch
        value={theme.mode === 'dark'}
        onValueChange={value => theme.setMode(value ? 'dark' : 'light')}
      />

      <Text>{JSON.stringify(selectedCountry)}</Text>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.background};
`

export default Home
