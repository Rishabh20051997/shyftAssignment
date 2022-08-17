import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { getScreenConfiguration } from '../utils/NavigationUtils'
import { LoginScreen } from '../screens'



const loginStackScreens = {
    LoginScreen: getScreenConfiguration({
    screenName: LoginScreen
  })
}

// tslint:disable-next-line: variable-name
const Stack = createStackNavigator()

const loginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: false }}>
      {Object.entries({
        ...loginStackScreens,

      }).map(([name, component]) => <Stack.Screen key={name} name={name} {...component} />)}
    </Stack.Navigator>
  )
}

export {
    loginStack
}
