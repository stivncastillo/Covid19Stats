import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  background: ${props => props.disabled ? props.theme.backgroundAlt : props.theme.primary};
  padding: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  /* color: white; */
`
export default Button;
