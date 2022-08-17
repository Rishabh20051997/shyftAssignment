import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { getScreenConfiguration } from '../utils/NavigationUtils'
import { ProfileScreen } from '../screens'



const profileStackScreens = {
    ProfileScreen: getScreenConfiguration({
    screenName: ProfileScreen
  })
}

// tslint:disable-next-line: variable-name
const Stack = createStackNavigator()

const profileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: false }}>
      {Object.entries({
        ...profileStackScreens,

      }).map(([name, component]) => <Stack.Screen key={name} name={name} {...component} />)}
    </Stack.Navigator>
  )
}

export {
    profileStack
}
