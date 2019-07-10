import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { ListaTeams } from '../components/listaTeams'

const TabNavigator = createBottomTabNavigator({
    Home: ListaTeams,
    //Settings: SettingsScreen,
  });
  
  export default createAppContainer(TabNavigator);