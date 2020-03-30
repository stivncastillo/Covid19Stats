import React, { useContext } from 'react'
import { Text } from 'react-native'
// import { useTheme } from '../../utils/ThemeContext'
import CountryContext from '../../context/country/countryContext';
import { ScrollContainer, ScreenSubtitle, Card } from '../../components';

const Home = ({ navigation }) => {
  // const theme = useTheme();
  const countryContext = useContext(CountryContext);
  const { selectedCountry } = countryContext;

  // if (selectedCountry === null) {
  //   navigation.navigate('SelectCountry');
  // }

  return (
    <ScrollContainer>
      <ScreenSubtitle>March 25 2020</ScreenSubtitle>

      <Card title="Colombian News" icon="settings" iconOnPress={() => alert('puto!')}>
        <Text style={{color: 'white'}}>{JSON.stringify(selectedCountry)}</Text>
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

      <Card title="Colombian News" icon="settings">
        <Text style={{color: 'white'}}>{JSON.stringify(selectedCountry)}</Text>
      </Card>
    </ScrollContainer>
  )
}

export default Home
