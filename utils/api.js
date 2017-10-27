import { AsyncStorage } from 'react-native'
import { USER_DATA_STORAGE_KEY } from './consts'
import { getDeckColor } from './helpers'
import uuidv4 from 'uuid/v4'

export const getDecks = () => {
    return AsyncStorage.getItem(USER_DATA_STORAGE_KEY)
      .then(JSON.parse)
      .then(res => {
        return res
      })
      .then(res => ({
        status: 200,
        data: res,
        info: 'fetch deck info succeed'
      }))
      .catch(err => ({
        status: 500,
        data: null,
        info: 'An ERROR occured when fetching specific deck'
      }))
}

export const getDeck = ({id}) => {
    return AsyncStorage.getItem(USER_DATA_STORAGE_KEY)
        .then(JSON.parse)
        .then(res => ({
          status: 200,
          data: res[id] || null,
          info: 'fetch deck info succeed'
        }))
        .catch(err => ({
          status: 500,
          data: null,
          info: 'An ERROR occured when fetching specific deck'
        }))
}

export const saveDeckTitle = ({ title }) => {
  let _deck = newDeckData(title)
  return AsyncStorage.mergeItem(USER_DATA_STORAGE_KEY, JSON.stringify(_deck))
    .then(() => ({
      status: 200,
      data: _deck,
      info: 'add deck succeed'
    }))
    .catch(err => ({
      status: 500,
      data: null,
      info: 'An ERROR occured when adding new deck'
    }))
}

export const addCardToDeck = ({ id, card }) => {
  return getDeck({id})
    .then(res => res.data)
    .then(res => {
    if (!res) return {
      status: 500,
      data: null,
      info: 'An ERROR occured when adding card to deck'
    }
    let _targetDeck = JSON.parse(JSON.stringify(res))
    _targetDeck.questions && _targetDeck.questions.push(newCardData(card))
    AsyncStorage.mergeItem(USER_DATA_STORAGE_KEY, JSON.stringify({
      [id]: _targetDeck
    }))
    return {
      status: 200,
      data: _targetDeck,
      info: 'Card add succeed'
    }
  }).catch(err => ({
    status: 500,
    data: null,
    info: 'An ERROR occured when adding card to deck'
  }))
}

function newCardData (card) {
  const _uid = uuidv4()
  return {
    id: _uid,
    deleted: false,
    ...card
  }
}

function newDeckData (title) {
  const _uid = uuidv4()
  return {
    [_uid]: {
      id: _uid,
      timestamp: new Date().getTime(),
      title,
      backgroundColor: getDeckColor(),
      questions: [],
      deleted: false
    }
  }
}

const initData = {
  React: {
    id: 'React',
    timestamp: '012390123',
    title: 'React',
    backgroundColor: '#f26f28',
    deleted: false,
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
        deleted: false,
        id: 1
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
        deleted: false,
        id: 2
      }
    ]
  },
  JavaScript: {
    id: 'JavaScript',
    timestamp: '012390124',
    title: 'JavaScript',
    backgroundColor: '#7c53c3',
    deleted: false,
    questions: [
      {
        question: 'What is a closure?',
        deleted: false,
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

AsyncStorage.getItem(USER_DATA_STORAGE_KEY)
  .then(JSON.parse)
  .then(res => {
    if (!res) {
      AsyncStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(initData))
    }
  })
