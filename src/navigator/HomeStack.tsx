import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from '../screens/HomeScreen'
import { getScreenConfiguration } from '../utils/NavigationUtils'
import { ApplyLoanScreen } from '../screens/ApplyLoanScreen'


const homeStackScreens = {
  HomeScreen: getScreenConfiguration({
    screenName: HomeScreen
  }),
  ApplyLoanScreen: getScreenConfiguration({
    screenName: ApplyLoanScreen
  })
}

// tslint:disable-next-line: variable-name
const Stack = createStackNavigator()

const homeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: false }}>
      {Object.entries({
        ...homeStackScreens,

      }).map(([name, component]) => <Stack.Screen key={name} name={name} {...component} />)}
    </Stack.Navigator>
  )
}

export {
  homeStack
}
