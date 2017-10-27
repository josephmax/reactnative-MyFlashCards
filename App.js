import React from 'react'
import { Provider } from 'react-redux'
import { Text, View } from 'react-native'
import { MyStatusBar } from './components'
import MainNavigator from './screens/MainNavigator'
import { setLocalNotification } from './utils/helpers'
import styles from './utils/styles'
import store from './store'

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
