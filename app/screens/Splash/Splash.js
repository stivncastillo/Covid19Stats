import React from 'react'
import { View, Text } from 'react-native'

const Splash = ({ navigation }) => {

  // if the country its no selected show modal
  // navigation.navigate('SelectCountry');

  return (
    <View>
      <Text onPress={() => navigation.navigate('Tab')}>Splash</Text>
    </View>
  )
}

export default Splash
