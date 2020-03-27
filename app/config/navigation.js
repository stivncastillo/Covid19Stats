import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';

import Splash from '../screens/Splash/Splash';
import Home from '../screens/Home/Home';
import Settings from '../screens/Settings/Settings';
import News from '../screens/News/News';
import SelectCountry from '../screens/SelectCountry/SelectCountry';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="SelectCountry" component={SelectCountry} />
    <HomeStack.Screen
      name="Splash"
      component={Splash}
      options={{
        headerShown: false,
      }} />
  </HomeStack.Navigator>
);

const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="Settings" component={Settings} />
  </SettingsStack.Navigator>
);

const NewsStack = createStackNavigator();
const NewsStackScreen = () => (
  <NewsStack.Navigator>
    <NewsStack.Screen name="News" component={News} />
  </NewsStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
  <AppTabs.Navigator
    tabBarOptions={{
      showLabel: false,
    }}>
    <AppTabs.Screen name="Home" component={HomeStackScreen}
      options={{
        tabBarIcon: props => (
          <Icon name="grid" size={props.size} color={props.color} />
        ),
      }} />
    <AppTabs.Screen name="News" component={NewsStackScreen}
      options={{
        tabBarIcon: props => (
          <Icon name="globe" size={props.size} color={props.color} />
        ),
      }}/>
    <AppTabs.Screen name="Settings" component={SettingsStackScreen}
      options={{
        tabBarIcon: props => (
          <Icon name="settings" size={props.size} color={props.color} />
        ),
      }}/>
  </AppTabs.Navigator>
);

export default () => (
  <NavigationContainer>
    <AppTabsScreen />
  </NavigationContainer>
);
