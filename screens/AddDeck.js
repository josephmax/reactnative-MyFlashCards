import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { KeyboardAvoidingView, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { fetchDeckList } from '../actions'
import { red } from '../utils/consts'
import styles from '../utils/styles'

class AddDeck extends Component {
  state = {
    deckTitle: ''
  }
  submit = () => {
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
  render () {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.pageWrapper}>
        <Text style={styles.hintText}>What's the title</Text>
        <Text style={styles.hintText}>of your new</Text>
        <Text style={styles.hintText}>Deck?</Text>
        <TextInput style={styles.textInput}
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
