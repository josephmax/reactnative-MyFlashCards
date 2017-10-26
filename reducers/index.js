import { UPDATE_DECK_LIST, UPDATE_TARGET_DECK } from '../utils/consts'

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
    deckList: state.deckList.map(item => item.id === action.payload.id ? action.payload : item),
    targetDeck: action.payload
  })
}

export default (state = initState, action) => {
  return ACTION_HANDLER[action.type] ? ACTION_HANDLER[action.type](state, action) : state
}
