import { AsyncStorage } from 'react-native'
import { gray, white, chestnut, mint, mud, darkOrange, matcha, NOTIFICATION_KEY } from './consts'
import { Notifications, Permissions } from 'expo'

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

export const updateDataToList = (item, list) => {
  let _list = jsonDeepClone(list)
  let _item = jsonDeepClone(item)
  let exists = false
  _list.map(listItem => {
    if (listItem.id === _item.id) {
      exists = true
      return _item
    } else {
      return listItem
    }
  })
  if (!exists && item) {
    _list.unshift(_item)
  }
  return _list
}

function jsonDeepClone(obj) {
  return obj ? JSON.parse(JSON.stringify(obj)) : {}
}

export const setLocalNotification =  () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(30)

              Notifications.scheduleLocalNotificationAsync(
                {
                  title: 'Flash Card Quiz Time!',
                  body: "👋 don't forget to complete at least one quiz for today!",
                  ios: {
                    sound: true,
                  },
                  android: {
                    sound: true,
                    priority: 'high',
                    sticky: false,
                    vibrate: true,
                  }
                },
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

