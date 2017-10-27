import { UPDATE_DECK_LIST, UPDATE_TARGET_DECK } from '../utils/consts'
import { updateDataToList } from '../utils/helpers'

const initState = {
  deckList: [],
  targetDeck: ''
}

const ACTION_HANDLER = {
  [UPDATE_DECK_LIST]: (state, action) => ({
    ...state,
    deckList: action.payload
  }),
  [UPDATE_TARGET_DECK]: (state, action) => ({
    ...state,
    deckList: updateDataToList(action.payload, state.deckList),
    targetDeck: action.payload
  })
}

export default (state = initState, action) => {
  return ACTION_HANDLER[action.type] ? ACTION_HANDLER[action.type](state, action) : state
}
