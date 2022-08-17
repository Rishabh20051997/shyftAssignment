import React, { useCallback, useEffect } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { get, map } from 'lodash'

import { isTablet, MAIN_STACK_KEYS, TAB_KEYS } from '../common/Constant'
import { navigationDataStore } from '../stores'
import { colors } from '../common/Colors'
import { icons } from '../common/Icons'



const TAB_BAR_KEY: Map<string, any> = new Map([
  [TAB_KEYS.HOME_TAB, {
    STACK_NAME: MAIN_STACK_KEYS.HOME_STACK,
    NORMAL_ICON: icons.HOME_ICON
  }],
  [TAB_KEYS.SEARCH_TAB, {
    STACK_NAME: MAIN_STACK_KEYS.SEARCH_STACK,
    NORMAL_ICON: icons.SEARCH_ICON
  }],
  [TAB_KEYS.PROFILE_TAB, {
    STACK_NAME: MAIN_STACK_KEYS.PROFILE_STACK,
    NORMAL_ICON: icons.PROFILE_ICON
  }],
  [TAB_KEYS.LOAN_TAB, {
    STACK_NAME: MAIN_STACK_KEYS.LOAN_STACK,
    NORMAL_ICON: icons.MORE_ICON
  }]
])

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    alignItems: 'center'
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: isTablet() ? '50%' : '100%'
  },
  tabContainer: {
    alignItems: 'center'
  }
})


const bottomTabBarComponent = ({ state, navigation }) => {

  const onPressTabItem = (stackName, tabName) => {
    navigationDataStore.setActiveTabName(stackName)
    navigation.navigate(tabName)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    navigationDataStore.setActiveTabName(MAIN_STACK_KEYS.HOME_STACK)
  }, [])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const { index, routeNames = [] } = state || {}
    const activeTabName = get(routeNames, `${index}`, 0)
    const { STACK_NAME } = TAB_BAR_KEY.get(activeTabName)
    navigationDataStore.setActiveTabName(STACK_NAME)
  }, [state])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const getActiveTabIndex = useCallback(() => {
    return state.index
  }, [state.index])

  const renderTabItem = (routeName, index) => {

    const { STACK_NAME, NORMAL_ICON } = TAB_BAR_KEY.get(routeName)

    const isTabActive = getActiveTabIndex() === index
    let activeIconStyle = {
      tintColor: colors.textTertiary
    }
    let textStyle = {
      color: colors.textTertiary,
      paddingVertical: 5
    }
    if (isTabActive) {
      activeIconStyle = {
        tintColor: colors.primaryColor
      }
      textStyle = {
        color: colors.primaryColor,
        paddingVertical: 5
      }
    }

    return (
      <TouchableOpacity 
      style={styles.tabContainer}
      onPress={() => onPressTabItem(STACK_NAME, routeName)}>
        {/* <View style={styles.badgeContainer}>
          {routeName === TAB_KEYS.NOTIFICATION_TAB && <Badges />}
        </View> */}
        <Image
          source={NORMAL_ICON}
          style={[{
            width: 24,
            height: 24,
          },
            activeIconStyle
          ]}
        />

        <Text style={{
          ...textStyle,
          fontSize: hp('1.5%'), fontWeight: isTabActive ? 'bold' : '400'
        }}>
          {routeName}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderBottomTabBar = () => {
    const routeNames = get(state, 'routes', [])
    return <View style={styles.tabBarContainer}>
      {map(routeNames, (routeItem, index) => {
        const { name } = routeItem
        return renderTabItem(name, index)
      })}
    </View>

  }

  return (
    <View style={styles.mainContainer}>
      {renderBottomTabBar()}
    </View>
  )
}

export {
  bottomTabBarComponent as BottomTabBarComponent
}
