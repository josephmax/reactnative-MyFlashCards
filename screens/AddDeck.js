import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { fetchDeckList } from '../actions'
import { red } from '../utils/consts'
import styles from '../utils/styles'

class AddDeck extends Component {
  state = {
    deckTitle: ''
  }
  submit = () => {
    // valid
    let _valid = this.valid()
    if (!_valid.result) {
      Alert.alert(
        'ATTENSION',
        'Please Enter A Title For Your Deck',
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
    const { deckTitle } = this.state
    const { navigation, xFetchDeckList } = this.props
    saveDeckTitle({
      title: deckTitle
    }).then(res => res.data)
      .then(res => {
        if (res) {
          this.setState({
            deckTitle: ''
          })
          xFetchDeckList()
          navigation.navigate('DeckList')
        }
      })
  }
  valid = () => {
    const { deckTitle } = this.state
    if (!deckTitle) {
      return {
        result: false,
        focus: 'deckTitleEl'
      }
    }
    return {
      result: true
    }
  }
  render () {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.pageWrapper}>
        <Text style={styles.hintText}>What's the title</Text>
        <Text style={styles.hintText}>of your new</Text>
        <Text style={styles.hintText}>Deck?</Text>
        <TextInput style={styles.textInput}
          ref={(el) => {
            this.deckTitleEl = el
          }}
          value={this.state.deckTitle}
          onChangeText={val => this.setState({deckTitle: val})}
          maxLength={20} />
        <TouchableOpacity onPress={this.submit}>
          <View style={[styles.button, {backgroundColor: red}]}>
            <Text style={styles.buttonText}>Create Deck</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

export default connect(state => state, dispatch => bindActionCreators({
  xFetchDeckList: fetchDeckList
}, dispatch))(AddDeck)
