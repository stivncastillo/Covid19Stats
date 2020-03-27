import React from 'react'
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 16px;
  background: ${props => props.theme.background};
`
export default Container;
