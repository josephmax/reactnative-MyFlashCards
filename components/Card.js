import React, { Component } from 'react'
import { View, Text, Animated, TouchableOpacity, Platform } from 'react-native'
import FlipCard from 'react-native-flip-card'
import styles from '../utils/styles'
import { blue } from '../utils/consts'

class Card extends Component {
  state = {
    showAnswer: false,
    bounceValue: new Animated.Value(1)
  }

  componentWillReceiveProps () {
    this.setState({showAnswer: false})
  }
  componentWillUnmount () {
    const { bounceValue } = this.state
    bounceValue.removeAllListeners()
  }
  render () {
    const { data } = this.props
    const { showAnswer, bounceValue } = this.state
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FlipCard flip={showAnswer}
          perspective={Platform.OS === 'ios' ? 0 : 800}
          style={{borderWidth: 0}}
          friction={8}
          flipHorizontal={true}
          flipVertical={false}>
          <View style={[styles.quizCard, styles.cardFace]}>
            <Text style={styles.hintText}>
              {data.question + '?'}
            </Text>
          </View>
          <View style={[styles.quizCard, styles.cardBack]}>
            <Text style={styles.hintText}>
              {data.answer}
            </Text>
          </View>
        </FlipCard>
      </View>
    )
  }
}

export default Card
