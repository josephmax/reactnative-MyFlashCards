import { UPDATE_DECK_LIST, UPDATE_TARGET_DECK } from '../utils/consts'
import * as API from '../utils/api'
import { rawDataToDeckList } from '../utils/helpers'

export const updateDeckList = arr => ({
  type: UPDATE_DECK_LIST,
  payload: arr ? JSON.parse(JSON.stringify(arr)) : null
})

export const updateTargetDeck = obj => ({
  type: UPDATE_TARGET_DECK,
  payload: obj ? JSON.parse(JSON.stringify(obj)) : null
})

export const fetchDeckList = () => dispatch => API.getDecks().then(res => res.data)
  .then(res => {
    if (res) {
      let list = rawDataToDeckList(res)
      dispatch(updateDeckList(list))
    } else {
      dispatch(updateDeckList(null))
    }
  })
  .catch(err => {
    dispatch(updateDeckList(null))
  })

