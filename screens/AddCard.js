import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import { addCardToDeck } from '../utils/api'
import { updateTargetDeck } from '../actions'
import { red, longInputWidth } from '../utils/consts'
import styles from '../utils/styles'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  submit = () => {
    // valid
    let _valid = this.valid()
    if (!_valid.result) {
      Alert.alert(
        'ATTENSION',
        `Please Enter ${_valid.info.toUpperCase()} For Your Card`,
        [
          {
            text: 'OK',
            onPress: () => {
              this[_valid.focus].focus()
            }
          },
        ],
        { cancelable: false }
      )
      return
    }
    // prepare data to submit
    const { question, answer } = this.state
    let card = { question, answer }
    const { navigation, xUpdateTargetDeck } = this.props
    const { id } = navigation.state.params
    addCardToDeck({
      id,
      card
    }).then(res => res.data)
    .then(res => {
      if (res) {
        this.setState({
          question: '',
          answer: ''
        })
        xUpdateTargetDeck(res)
        navigation.goBack()
      }
    })
  }
  valid = () => {
    const { question, answer } = this.state
    if (!question) {
      return {
        result: false,
        info: 'question',
        focus: 'questionEl'
      }
    }
    if (!answer) {
      return {
        result: false,
        info: 'answer',
        focus: 'answerEl'
      }
    }
    return {
      result: true
    }
  }
  render () {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.pageWrapper}>
        <Text style={styles.hintText}>Enter your question</Text>
        <TextInput
          ref={(el) => {
            this.questionEl = el
          }}
          style={[styles.textInput, {width: longInputWidth}]}
          value={this.state.question}
          onChangeText={val => this.setState({question: val})}
          maxLength={100} />
        <Text style={styles.hintText}>Enter your answer</Text>
        <TextInput
          ref={(el) => {
            this.answerEl = el
          }}
          style={[styles.textInput, {width: longInputWidth}]}
          value={this.state.answer}
          onChangeText={val => this.setState({answer: val})}
          maxLength={100} />
        <TouchableOpacity onPress={this.submit}>
          <View style={[styles.button, {backgroundColor: red}]}>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

export default connect(null, dispatch => bindActionCreators({
  xUpdateTargetDeck: updateTargetDeck
}, dispatch))(AddCard)
