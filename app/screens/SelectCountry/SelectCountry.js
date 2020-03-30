import React, { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, TextInput, CountryItem, Button } from '../../components';
import { withTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';
import styles from './styles';
import CountryContext from '../../context/country/countryContext';

// Override
const ScreenContainer = styled(Container)`
  padding-top: 32px;
  padding-bottom: 16px;
`;

const SelectCountry = (props) => {
  const [countries, setCountries] = useState([]);
  const [textCountry, setTextCountry] = useState('');
  const [selected, setSelected] = useState({});
  const countryContext = useContext(CountryContext);
  const { countries: countriesList, getCountries, loading, removeLoading, selectCountry } = countryContext;

  useEffect(() => {
    getCountries();
  }, [])

  useEffect(() => {
    setCountries(countriesList);
    if (countriesList.length > 0) {
      removeLoading();
    }
  }, [countriesList])

  const onSelect = (country) => {
    if (country.iso3 === selected.iso3) {
      setSelected({});
    } else {
      setSelected(country);
    }
  };

  const onSave = async () => {
    try {
      await AsyncStorage.removeItem('@country');
      await AsyncStorage.setItem('@country', JSON.stringify(selected));

      selectCountry(selected);

      props.navigation.pop();
    } catch (e) {
      console.log('storeCounry -> e', e)
    }
  }

  const onSearch = (text) => {
    setTextCountry(text);

    const filterData = countries.filter(item => {
      return item.name.includes(text) && item.hasOwnProperty('iso3');
    });

    setCountries(filterData);
  }

  const getItem = ({ item }) => (
    <CountryItem
      onPress={() => onSelect(item)}
      activeOpacity={0.5}
      style={styles.item}
      >
      <Text style={{ color: props.theme.text }}>{item.name}</Text>
      {
        selected.iso3 === item.iso3 &&
        <Icon name="check" size={16} color={props.theme.text} />
      }
    </CountryItem>
  )

  return (
    <ScreenContainer>
      <View style={styles.searchContainer}>
        <TextInput
          value={textCountry}
          onChangeText={(text) => onSearch(text)}
          placeholder="Search Country" />
      </View>
      {
        loading ?
          <ActivityIndicator size="large" color={props.theme.textCardTitle} />
        :
        <FlatList
          style={styles.list}
          data={countries}
          renderItem={getItem}
          keyExtractor={item => item.iso3}
          extraData={selected}
          initialNumToRender={10}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
        />
      }

      <Button
        activeOpacity={0.7}
        onPress={() => onSave()}
        disabled={!Object.keys(selected).length > 0}>
        <Text style={{ color: props.theme.white }}>Continue</Text>
      </Button>
    </ScreenContainer>
  )
}

export default withTheme(SelectCountry)
