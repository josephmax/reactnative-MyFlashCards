import { Dimensions } from 'react-native'
let { height, width } = Dimensions.get('window')

// dimensions
export const titleFontSize = Math.floor(width / 12)
export const subtitleFontSize = Math.floor(width / 15)
export const smallFontSize = Math.floor(width / 18)
export const btnFontSize = Math.floor(width / 15)
export const cardHeight = Math.floor(height / 3)
export const inputWidth = Math.floor(width / 2)
export const longInputWidth = Math.floor(width * 0.8)

// storage key
export const USER_DATA_STORAGE_KEY = 'MyFlashCards:data'

// action key
export const UPDATE_DECK_LIST = 'UPDATE_DECK_LIST'
export const UPDATE_TARGET_DECK = 'UPDATE_TARGET_DECK'

// colors
export const purple = '#292477'
export const gray = '#757575'
export const white = '#fff'
export const red = '#b71845'
export const orange = '#f26f28'
export const blue = '#4e4cb8'
export const lightPurp = '#7c53c3'
export const pink = '#b93fb3'
export const chestnut = '#823935'
export const mint = '#89beb2'
export const mud = '#c9ba83'
export const darkOrange = '#de9c53'
export const matcha = '#a0bf7c'
