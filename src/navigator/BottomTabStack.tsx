import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabBarComponent } from './BottomTabBarComponent'
import { TAB_KEYS } from '../common/Constant'
import { HomeScreen } from '../screens/HomeScreen'
import { getScreenConfiguration } from '../utils/NavigationUtils'
import { LoanScreen, ProfileScreen, SearchScreen } from '../screens'


const bottomTabBarKeys = {
  [TAB_KEYS.HOME_TAB]: getScreenConfiguration({
    screenName: HomeScreen
  }),

  [TAB_KEYS.SEARCH_TAB]: getScreenConfiguration({
    screenName: SearchScreen
  }),

  [TAB_KEYS.PROFILE_TAB]: getScreenConfiguration({
    screenName: ProfileScreen
  }),
  [TAB_KEYS.LOAN_TAB]: getScreenConfiguration({
    screenName: LoanScreen
  })
}

const bottomTabBarStack = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      initialRouteName={TAB_KEYS.HOME_TAB}
      screenOptions={{
        headerShown: false
      }}

      tabBar={props => <BottomTabBarComponent {...props} />}
    >
      {Object.entries({
        ...bottomTabBarKeys
      }).map(([name, component]) => <Tab.Screen name={name} {...component} />)}
    </Tab.Navigator>
  )
}

export {
  bottomTabBarStack
}
