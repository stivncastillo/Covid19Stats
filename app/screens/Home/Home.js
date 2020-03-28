import React, { useEffect, useState } from 'react'
import { View, Text, Switch } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components/native'
import { useTheme } from '../../utils/ThemeContext'

const Home = (props) => {
  const theme = useTheme();
  const [country, setCountry] = useState('')

  useEffect(() => {
    getMyValue()
  }, []);

  const getMyValue = async () => {
    try {
      const value = await AsyncStorage.getItem('@country')
      setCountry(value);
      console.log('getMyValue -> value', value)
    } catch(e) {
      // read error
    }
  }

  return (
    <Container>
      <Switch
        value={theme.mode === 'dark'}
        // onValueChange={value => theme.setMode(value ? 'dark' : 'light')}
        onValueChange={value => props.navigation.navigate('SelectCountry')}
      />
      <Switch
        value={theme.mode === 'dark'}
        // onValueChange={value => theme.setMode(value ? 'dark' : 'light')}
        onValueChange={value => getMyValue()}
      />

      <Text>{country}</Text>
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
