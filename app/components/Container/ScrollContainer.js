import styled from 'styled-components/native';

const ScrollContainer = styled.ScrollView`
  background: ${props => props.theme.background};
  flex: 1;
  flex-direction: column;
  padding: 16px;
`
export default ScrollContainer;
