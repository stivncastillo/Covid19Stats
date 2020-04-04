import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, RefreshControl, Text, View, Dimensions } from 'react-native'
import { withTheme } from 'styled-components/native';
import { LineChart } from 'react-native-chart-kit';
import styled from 'styled-components/native';
import CountryContext from '../../context/country/countryContext';
import StatsContext from '../../context/stats/statsContext';
import { ScrollContainer, ScreenSubtitle, Card, Indicator, Circle } from '../../components';

const IndicatorContainer = styled.View`
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
  margin-bottom: 0px;
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
    getCountryChartStats,
    countryChartStats,
    countryStats,
    loadingGlobalStats,
    loadingCountryStats,
    loadingCountryChartStats,
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
      getCountryChartStats(selectedCountry.name);
    }
  }

  if (selectedCountry === null) {
    navigation.navigate('SelectCountry');
  }

  return (
    <ScrollContainer
      contentContainerStyle={{ paddingBottom: 80 }}
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
              <Text style={{ color: theme.text }}>Sorry, no data to show.</Text>
        }
      </Card>

      {
        selectedCountry !== null &&
          <>
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
                    <Text style={{ color: theme.text }}>Sorry, no data to show.</Text>
              }
            </Card>

            <Card title={selectedCountry !== null ? `Cases in ${selectedCountry.name} Last days` : 'No Country Selected'}>
              {
                loadingCountryChartStats ?
                  <ActivityIndicator size="small" color={theme.textCardTitle} />
                :
                countryChartStats.labels.length > 0 && countryChartStats.datasets.length > 0 ?
                  <View>
                    <View style={{ flexDirection: 'row'}}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8}}>
                        <Circle style={{ backgroundColor: 'rgba(200, 176, 63, 1)'}} />
                        <Text style={{ color: theme.text }}>Cases</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8}}>
                        <Circle style={{ backgroundColor: 'rgba(255, 86, 86, 1)'}} />
                        <Text style={{ color: theme.text }}>Deaths</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8}}>
                        <Circle style={{ backgroundColor: 'rgba(58, 208, 147, 1)'}} />
                        <Text style={{ color: theme.text }}>Recovered</Text>
                      </View>
                    </View>
                    <LineChart
                      verticalLabelRotation={45}
                      withOuterLines={false}
                      data={{
                        labels: countryChartStats.labels,
                        datasets: countryChartStats.datasets,
                      }}
                      width={Dimensions.get('window').width - 64}
                      height={220}
                      chartConfig={{
                        backgroundColor: theme.backgroundAlt,
                        backgroundGradientFrom: theme.backgroundAlt,
                        backgroundGradientTo: theme.backgroundAlt,
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        propsForDots: {
                          r: '4',
                        },
                      }}
                      bezier
                      style={{
                        marginVertical: 8,
                        paddingBottom: 16,
                      }}
                    />
                  </View>
                :
                  <Text style={{ color: theme.text }}>Sorry, no data to show.</Text>
              }
            </Card>
          </>
      }

    </ScrollContainer>
  )
}

export default withTheme(Home);
