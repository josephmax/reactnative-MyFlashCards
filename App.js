import React from 'react'
import { Provider } from 'react-redux'
import { Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { MyStatusBar } from './components'
import { DeckDetail, AddCard, Quiz, Home } from './screens'
import { white } from './utils/consts'
import { setLocalNotification } from './utils/helpers'
import styles from './utils/styles'
import store from './store'

const MainNavigator = StackNavigator({
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

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MyStatusBar barStyle="light-content"/>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
