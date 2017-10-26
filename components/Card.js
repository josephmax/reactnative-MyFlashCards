import React, { Component } from 'react'
import { View, Text, Animated, TouchableOpacity } from 'react-native'
import styles from '../utils/styles'
import { blue } from '../utils/consts'

class Card extends Component {
  state = {
    showAnswer: false,
    bounceValue: new Animated.Value(1)
  }
  turnOver = () => {
    const { showAnswer, bounceValue } = this.state
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04}),
      Animated.spring(bounceValue, { toValue: 1, friction: 4})
    ]).start()
    this.setState({showAnswer: !showAnswer})
  }
  componentWillReceiveProps () {
    this.setState({showAnswer: false})
  }
  render () {
    const { data } = this.props
    const { showAnswer, bounceValue } = this.state
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Animated.Text
          style={[styles.hintText, {transform: [{scale: bounceValue}]}]}>
          {showAnswer ? data.answer : data.question}
        </Animated.Text>
        <TouchableOpacity onPress={this.turnOver}>
          <View style={[styles.button, {borderWidth: 0}]}>
            <Text style={[styles.buttonText, {color: blue}]}>{showAnswer ? 'show question' : 'show answer'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Card
