import React from 'react';
import styled from 'styled-components/native';
import { View, Text, Image } from 'react-native';
import { CenterContainer } from '../../components';


import styles from './styles';

const TextAuthor = styled.Text`
  color: ${props => props.theme.textMuted};
`

const Splash = (props) => {
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
