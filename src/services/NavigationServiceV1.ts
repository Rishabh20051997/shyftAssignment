import { get } from 'lodash'
import { navigationDataStore } from '../stores'


export function navigateSimple(navigation, routeName: string, params: any = {}, parentStackName: string = '') {
  const prevRouteDataToBe = navigationDataStore.getCurrentRouteData()
  // log('WWW set previous root from navigateSimple' , prevRouteDataToBe)
  navigationDataStore.setPreviousRouteData(prevRouteDataToBe)
  const stackName = parentStackName?.length > 0 ? parentStackName : navigationDataStore.activeBottomTabName
  if (navigation) {
    if (stackName) {
      navigation.navigate(stackName, { screen: routeName, params })
    } else {
      navigation.navigate(routeName, params, parentStackName)
    }
  }
}

export function goBack(navigation) {
  if (get(navigation, 'goBack')) {
    navigation.goBack(null)
  }
}

export const setInititalStackName = (stackName) => {
  navigationDataStore.setCurrentStackName(stackName)
}
