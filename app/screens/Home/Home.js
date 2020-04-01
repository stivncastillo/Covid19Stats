import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, RefreshControl } from 'react-native'
import { withTheme } from 'styled-components/native';
import styled from 'styled-components/native';
import CountryContext from '../../context/country/countryContext';
import StatsContext from '../../context/stats/statsContext';
import { ScrollContainer, ScreenSubtitle, Card, Indicator } from '../../components';

const IndicatorContainer = styled.View`
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const Home = ({ navigation, theme }) => {
  const today = new Date().toDateString();
  const [refreshing, setRefreshing] = useState(false);
  const countryContext = useContext(CountryContext);
  const statsContext = useContext(StatsContext);
  const { selectedCountry } = countryContext;
  const { globalStats, getGlobalStats, getCountryStats, countryStats } = statsContext;

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();

    new Promise(resolve => {
      setTimeout(resolve, 1000);
    }).then(() => {
      console.log('sisas')
      setRefreshing(false)
    });
  }, [refreshing]);

  const loadData = () => {
    getGlobalStats();

    if (selectedCountry !== null) {
      getCountryStats(selectedCountry.name);
    }
  }

  if (selectedCountry === null) {
    navigation.navigate('SelectCountry');
  }

  return (
    <ScrollContainer
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <ScreenSubtitle>{today}</ScreenSubtitle>

      <Card title="Global Situation">
        {
          globalStats !== null ?
              <IndicatorContainer>
                <Indicator name="Confirmed" number={globalStats.cases} />
                <Indicator name="Recovered" number={globalStats.recovered} />
                <Indicator name="Deaths" number={globalStats.deaths} />
              </IndicatorContainer>
          :
            <ActivityIndicator size="large" color={theme.textCardTitle} />
        }
      </Card>

      {
        selectedCountry !== null &&
          <Card title={`${selectedCountry.name} Situation`} icon="settings">
            {
              countryStats !== null ?
                <>
                  <IndicatorContainer>
                    <Indicator name="Confirmed" number={countryStats.cases} />
                    <Indicator name="Recovered" number={countryStats.recovered} />
                  </IndicatorContainer>
                  <IndicatorContainer>
                    <Indicator name="Today Cases" number={countryStats.todayCases} />
                    <Indicator name="Deaths" number={countryStats.deaths} />
                  </IndicatorContainer>
                </>
              :
                <ActivityIndicator size="large" color={theme.textCardTitle} />
            }
          </Card>
      }
    </ScrollContainer>
  )
}

export default withTheme(Home);
