import React from 'react'
import { View, Text, Switch } from 'react-native'
import styled from 'styled-components/native'
import { useTheme } from '../../utils/ThemeContext'

const Home = (props) => {
  const theme = useTheme()
  console.log(props)

  return (
    <Container>
      <Switch
        value={theme.mode === 'dark'}
        onValueChange={value => theme.setMode(value ? 'dark' : 'light')}
      />
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
