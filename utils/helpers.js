import { gray, white, chestnut, mint, mud, darkOrange, matcha } from './consts'

export const rawDataToDeckList = (data = {}, options = {}) => {
  const { filter, sort } = options
  return Object.keys(data)
    .map(deck => data[deck])
    .filter(filter || (item => !item.deleted))
    .sort(sort || ((a, b) => b.timestamp - a.timestamp))
}

const colorPool = [chestnut, mint, darkOrange, matcha, mud]
let colorLoopIndex = 0
export const getDeckColor = (index) => {
  colorLoopIndex = colorLoopIndex + 1 > 4 ? 0 : colorLoopIndex + 1
  return colorPool[colorLoopIndex]
}
