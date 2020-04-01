import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, RefreshControl, Text } from 'react-native'
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
  const {
    globalStats,
    getGlobalStats,
    getCountryStats,
    countryStats,
    loadingGlobalStats,
    loadingCountryStats,
  } = statsContext;

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();

    new Promise(resolve => {
      setTimeout(resolve, 1000);
    }).then(() => {
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
          loadingGlobalStats ?
            <ActivityIndicator size="small" color={theme.textCardTitle} />
            :
              globalStats !== null ?
                <IndicatorContainer>
                  <Indicator name="Confirmed" number={globalStats.cases} />
                  <Indicator name="Recovered" number={globalStats.recovered} />
                  <Indicator name="Deaths" number={globalStats.deaths} />
                </IndicatorContainer>
            :
              <Text style={{ colot: theme.text }}>Sorry, no data to show.</Text>
        }
      </Card>

      {
        selectedCountry !== null &&
          <Card title={selectedCountry !== null ? `${selectedCountry.name} Situation` : 'No Country Selected'} icon="edit" iconOnPress={() => navigation.navigate('SelectCountry')}>
            {
              loadingCountryStats ?
                <ActivityIndicator size="small" color={theme.textCardTitle} />
              :
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
                  <Text style={{ colot: theme.text }}>Sorry, no data to show.</Text>
            }
          </Card>
      }
    </ScrollContainer>
  )
}

export default withTheme(Home);
