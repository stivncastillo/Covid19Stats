import styled from 'styled-components/native';

const CountryItem = styled.TouchableOpacity`
  color: ${props => props.theme.text};
  padding: 16px;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.theme.separator};
`
export default CountryItem;
