import React, { Component } from 'react'
import { Platform } from 'react-native'
import { TabNavigator } from 'react-navigation'
import DeckList from './DeckList'
import AddDeck from './AddDeck'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { blue } from '../utils/consts'

export default TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({tintColor}) => Platform.OS === 'ios'
      ? <Ionicons size={30} name='ios-list' style={{color: tintColor}} />
      : <MaterialCommunityIcons size={25} name='view-list' style={{color: tintColor}} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({tintColor}) => Platform.OS === 'ios'
      ? <Ionicons size={30} name='ios-add' style={{color: tintColor}} />
      : <MaterialIcons size={25} name='add-box'style={{color: tintColor}} />
    }
  }
}, {
  tabBarPosition: Platform.OS === 'ios' ? 'bottom' : 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: blue,
    showIcon: true
  }
})
