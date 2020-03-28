import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import { CenterContainer } from '../../components';

// import CountryContext from '../../context/country/countryContext';

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
