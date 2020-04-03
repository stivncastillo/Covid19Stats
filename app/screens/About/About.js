import React from 'react'
import { Linking, Alert } from 'react-native';
import styled from 'styled-components/native';
import { ScrollContainer } from '../../components';
import { withTheme } from 'styled-components/native';

const TextScreen = styled.Text`
  color: ${props => props.theme.textMuted};
  margin-bottom: 8px;
`;

const TextLink = styled.Text`
  color: ${props => props.theme.primary};
`;

const data = {
  github: 'https://github.com/bacabange',
  repo: 'https://github.com/bacabange/Covid19Stats',
  newsApi: 'https://newsapi.org',
  statsApi: 'https://github.com/novelcovid/api',
  design: 'https://dribbble.com/shots/10603217-Covid-App-exploration',
  appIcon: 'https://www.flaticon.com/',
}

const About = ({ theme }) => {

  const onOpen = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <ScrollContainer>
      <TextScreen>Developer: Stiven Castillo (<TextLink onPress={() => {onOpen(data.github)}}>Github</TextLink>)</TextScreen>
      <TextScreen>Repo: <TextLink onPress={() => {onOpen(data.repo)}}>{data.repo}</TextLink></TextScreen>
      <TextScreen>NewsApi: <TextLink onPress={() => {onOpen(data.newsApi)}}>{data.newsApi}</TextLink></TextScreen>
      <TextScreen>Covid19 Stats and Info: <TextLink onPress={() => {onOpen(data.statsApi)}}>{data.statsApi}</TextLink></TextScreen>
      <TextScreen>Design by Anggit Yuniar Pradito: <TextLink onPress={() => {onOpen(data.design)}}>Dribble shot</TextLink></TextScreen>
      <TextScreen>App Icon made by: <TextLink onPress={() => {onOpen(data.appIcon)}}>www.flaticon.com</TextLink></TextScreen>
    </ScrollContainer>
  )
}

export default withTheme(About)
