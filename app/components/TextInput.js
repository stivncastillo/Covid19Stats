// import { TextInput } from 'react-native';
import styled from 'styled-components/native';

const AppTextInput = styled.TextInput.attrs((props) => ({
  placeholderTextColor: props.theme.textMuted,
}))`
  background: ${props => props.theme.backgroundAlt};
  color: ${props => props.theme.textMuted};
  border-radius: 10px;
  padding-right: 16px;
  padding-left: 16px;
`
export default AppTextInput;
