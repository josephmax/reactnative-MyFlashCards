import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native'
import { getDeck } from '../utils/api'
import { updateTargetDeck } from '../actions'
import { red, orange } from '../utils/consts'
import styles from '../utils/styles'

class DeckDetail extends Component {
  state = {
    deckData: null
  }

  componentDidMount () {
    this.fetchDeckDetail()
  }

  componentWillReceiveProps (nextProps) {
    const { targetDeck, navigation } = nextProps
    this.setState({
      deckData: targetDeck
    })
  }
  goAddCard = () => {
    const { navigation } = this.props
    const { id } = navigation.state.params
    navigation.navigate('AddCard', {
      id
    })
  }
  goQuiz = () => {
    const { navigation } = this.props
    const { id } = navigation.state.params
    navigation.navigate('Quiz', {
      id
    })
  }
  fetchDeckDetail = () => {
    const { navigation, xUpdateTargetDeck } = this.props
    const { id } = navigation.state.params
    getDeck({ id }).then(res => res.data)
      .then(res => {
        if (res) {
          xUpdateTargetDeck(res)
        } else {
          xUpdateTargetDeck(null)
        }
      })
      .catch(err => {
        console.log('err', err)
        xUpdateTargetDeck(null)
      })
  }
  render () {
    const { deckData } = this.state
    if (deckData === null) {
      return (
        <ActivityIndicator style={styles.loading}/>
      )
    }

    const _questions = deckData.questions.filter(item => !item.deleted)

    return (
      <View style={[styles.detailWrapper, {backgroundColor: deckData.backgroundColor}]}>
        <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.title}>
            {deckData.title}
          </Text>
          <Text style={styles.counts}>
            {`${_questions.length} ${_questions.length > 1 ? 'cards' : 'card'}`}
          </Text>
        </View>
        <TouchableOpacity style={{flex: 1}} onPress={this.goAddCard}>
          <View style={[styles.button, {backgroundColor: red}]}>
            <Text style={styles.buttonText}>
              Add Card
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}} onPress={this.goQuiz}>
          <View style={[styles.button, {backgroundColor: orange}]}>
            <Text style={styles.buttonText}>
              Start Quiz
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(state => state, dispatch => bindActionCreators({
  xUpdateTargetDeck: updateTargetDeck
}, dispatch))(DeckDetail)

