import React, { Component } from 'react'
import { Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckList from './DeckList'
import AddDeck from './AddDeck'
import DeckDetail from './DeckDetail'
import AddCard from './AddCard'
import Quiz from './Quiz'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { blue, white } from '../utils/consts'
import styles from '../utils/styles'

const Home = TabNavigator({
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


export default StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    path: 'deckDetail/:id',
    screen: DeckDetail,
    navigationOptions: ({navigation}) => ({
      headerTintColor: white,
      headerStyle: styles.header,
      title: navigation.state.params.title
    })
  },
  AddCard: {
    path: 'addCard/:id',
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: styles.header,
      title: 'Add Card'
    }
  },
  Quiz: {
    path: 'quiz/:id',
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: styles.header,
      title: 'Quiz'
    }
  }
})
