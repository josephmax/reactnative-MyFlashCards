import React from 'react'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { blue } from '../utils/consts'

export default function ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor: backgroundColor || blue, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
