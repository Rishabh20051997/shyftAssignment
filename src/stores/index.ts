import { NavigationDataStore } from './NavigationDataStore'
import { UserDataStore } from './UserDataStore'
import { HomeDataStore } from './HomeDataStore'

export * from './NavigationDataStore'
export * from './UserDataStore'
export * from './HomeDataStore'

const navigationDataStore = new NavigationDataStore()
const userDataStore = new UserDataStore()
const homeDataStore = new HomeDataStore()

export {
  navigationDataStore,
  userDataStore,
  homeDataStore
}

export default {
  navigationDataStore,
  userDataStore,
  homeDataStore
}