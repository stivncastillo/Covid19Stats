import React, { useContext, useEffect } from 'react'
import { Text, View } from 'react-native'
// import { useTheme } from '../../utils/ThemeContext'
import CountryContext from '../../context/country/countryContext';
import StatsContext from '../../context/stats/statsContext';
import { ScrollContainer, ScreenSubtitle, Card, Indicator } from '../../components';

import styled from 'styled-components/native';
const IndicatorContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const Home = ({ navigation }) => {
  // const theme = useTheme();
  const countryContext = useContext(CountryContext);
  const statsContext = useContext(StatsContext);
  const { selectedCountry } = countryContext;
  const { globalStats, getGlobalStats } = statsContext;
  console.log("Home -> globalStats", globalStats)

  useEffect(() => {
    getGlobalStats()
  }, [])

  // if (selectedCountry === null) {
  //   navigation.navigate('SelectCountry');
  // }

  return (
    <ScrollContainer>
      <ScreenSubtitle>March 25 2020</ScreenSubtitle>

      {
        globalStats !== null &&
        <Card title="Global Situation">
          <IndicatorContainer>
            <Indicator name="Confirmed" number={globalStats.cases} />
            <Indicator name="Recovered" number={globalStats.recovered} />
            <Indicator name="Deaths" number={globalStats.deaths} />
          </IndicatorContainer>
        </Card>
      }


      <Card title="Colombian Putos" icon="settings">
        <IndicatorContainer>
          <Indicator name="Confirmed" number={466836} />
          <Indicator name="Recovered" number={113225} />
          <Indicator name="Deaths" number={21105} />
        </IndicatorContainer>
      </Card>

      <Card title="Colombian News" icon="settings">
        <Text style={{color: 'white'}}>{JSON.stringify(selectedCountry)}</Text>
      </Card>

      <Card title="Colombian News" icon="settings">
        <Text style={{color: 'white'}}>{JSON.stringify(selectedCountry)}</Text>
      </Card>

      <Card title="Colombian News" icon="settings">
        <Text style={{color: 'white'}}>{JSON.stringify(selectedCountry)}</Text>
      </Card>
    </ScrollContainer>
  )
}

export default Home
