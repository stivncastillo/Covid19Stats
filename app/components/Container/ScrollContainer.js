import React from 'react'
import styled from 'styled-components/native';

const ScrollContainer = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  padding: 16px;
  background: ${props => props.theme.background};
`
export default ScrollContainer;
