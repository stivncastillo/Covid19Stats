import React from 'react'
import { View, Text, Switch, TouchableOpacity } from 'react-native'
import { ScrollContainer, ScreenSubtitle, CardContainer, SettingsItem } from '../../components';
import styled from 'styled-components/native';
import { useTheme } from '../../utils/ThemeContext'
import { withTheme } from 'styled-components/native';

const ScreenCardContainer = styled(CardContainer)`
  padding: 0px;
`;

const Separator = styled.View`
  border-top-width: 1px;
  border-style: solid;
  border-top-color: ${props => props.theme.background};
`
const TextLink = styled.Text`
  color: ${props => props.theme.textMuted};
  text-transform: uppercase;
`

const Settings = ({ theme, navigation }) => {
  const themeContext = useTheme();

  return (
    <ScrollContainer>
      <ScreenSubtitle>General</ScreenSubtitle>

      <ScreenCardContainer>
        <SettingsItem>
          <Text style={{ color: theme.text }}>Colombia</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ height: 60, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigation.navigate('SelectCountry')}>
            <TextLink>Change</TextLink>
          </TouchableOpacity>
        </SettingsItem>

        <Separator />

        <SettingsItem>
          <Text style={{ color: theme.text }}>Dark Theme</Text>
          <Switch
            value={themeContext.mode === 'dark'}
            onValueChange={value => themeContext.setMode(value ? 'dark' : 'light')}
          />
        </SettingsItem>
      </ScreenCardContainer>
    </ScrollContainer>
    )
  }

  export default withTheme(Settings);
