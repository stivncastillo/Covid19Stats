import React, { useContext } from 'react'
import { Text, Switch } from 'react-native'
import styled from 'styled-components/native'
import { useTheme } from '../../utils/ThemeContext'
import CountryContext from '../../context/country/countryContext';
import { Container } from '../../components';

const Home = ({ navigation }) => {
  const theme = useTheme();
  const countryContext = useContext(CountryContext);
  const { selectedCountry } = countryContext;

  // if (selectedCountry === null) {
  //   navigation.navigate('SelectCountry');
  // }

  return (
    <Container>
      <Text style={{color: 'white'}}>{JSON.stringify(selectedCountry)}</Text>
    </Container>
  )
}

export default Home
