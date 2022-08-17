import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { getScreenConfiguration } from '../utils/NavigationUtils'
import { SearchScreen } from '../screens'


const searchStackScreens = {
  SearchScreen: getScreenConfiguration({
    screenName: SearchScreen
  })
}

// tslint:disable-next-line: variable-name
const Stack = createStackNavigator()

const searchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: false }}>
      {Object.entries({
        ...searchStackScreens,

      }).map(([name, component]) => <Stack.Screen key={name} name={name} {...component} />)}
    </Stack.Navigator>
  )
}

export {
    searchStack
}
