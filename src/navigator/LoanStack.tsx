import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { getScreenConfiguration } from '../utils/NavigationUtils'
import { LoanScreen } from '../screens'


const loanStackScreens = {
    LoanScreen: getScreenConfiguration({
    screenName: LoanScreen
  })
}

// tslint:disable-next-line: variable-name
const Stack = createStackNavigator()

const loanStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: false }}>
      {Object.entries({
        ...loanStackScreens,

      }).map(([name, component]) => <Stack.Screen key={name} name={name} {...component} />)}
    </Stack.Navigator>
  )
}

export {
    loanStack
}
