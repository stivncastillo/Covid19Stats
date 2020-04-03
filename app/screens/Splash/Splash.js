import React, { useContext, useEffect } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import { CenterContainer } from '../../components';
import CountryContext from '../../context/country/countryContext';
import styles from './styles';

const TextAuthor = styled.Text`
  color: ${props => props.theme.textMuted};
`;

const Splash = () => {
  const countryContext = useContext(CountryContext);
  const { selectCountry } = countryContext;

  const getData = async () => {
    try {
      const country = await AsyncStorage.getItem('@country');
      if (country !== null) {
        selectCountry(JSON.parse(country))
      }
    } catch (e) {
      console.log('getData -> e', e)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <CenterContainer>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../../assets/Logo.png')}
      />

      <TextAuthor> Develop by Stiven Castillo </TextAuthor>
    </CenterContainer>
  )
}

export default Splash
