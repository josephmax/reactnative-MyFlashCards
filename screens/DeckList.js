import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { Deck } from '../components'
import { getDecks, getDeck } from '../utils/api'
import { rawDataToDeckList, getDeckColor } from '../utils/helpers'
import { fetchDeckList } from '../actions'
import styles from '../utils/styles'

class DeckList extends Component {
  state = {
    list: null
  }
  componentDidMount() {
    const { xFetchDeckList } = this.props
    setTimeout(xFetchDeckList, 2000)
  }
  componentWillReceiveProps(nextProps) {
    const { deckList } = nextProps
    this.setState({
      list: deckList
    })
  }

  render () {
    const { list } = this.state
    const { navigation } = this.props

    if (list === null) {
      return (
        <ActivityIndicator style={styles.loading}/>
      )
    }
    return (
      <FlatList style={styles.listWrapper}
        data={list}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
          <TouchableOpacity
            onPress={e => navigation.navigate('DeckDetail', {
              id: item.id,
              title: item.title
            })}>
            <Deck data={item} backgroundColor={item.backgroundColor}/>
          </TouchableOpacity>
          )}
      } />
    )
  }
}

export default connect(state => state, dispatch => bindActionCreators({
  xFetchDeckList: fetchDeckList
}, dispatch))(DeckList)
