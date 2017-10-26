import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from '../utils/styles'

class Deck extends Component {
  render () {
    const { data, backgroundColor } = this.props
    const _questions = data.questions.filter(item => !item.deleted)
    return (
      <View style={[styles.cardWrapper, { backgroundColor }]}>
        <Text style={styles.cardTitle}>
          {data.title}
        </Text>
        <Text style={styles.cardCounts}>
          {`${_questions.length} ${_questions.length > 1 ? 'cards' : 'card'}`}
        </Text>
      </View>
    )
  }
}

export default Deck
