import { NavigationDataStore } from './NavigationDataStore'
import { UserDataStore } from './UserDataStore'
import { HomeDataStore } from './HomeDataStore'
import { LoanApplyDataStore } from './LoanApplyDataStore'

export * from './NavigationDataStore'
export * from './UserDataStore'
export * from './HomeDataStore'
export * from './LoanApplyDataStore'

const navigationDataStore = new NavigationDataStore()
const userDataStore = new UserDataStore()
const homeDataStore = new HomeDataStore()
const loanApplyDataStore = new LoanApplyDataStore()

export {
  navigationDataStore,
  userDataStore,
  homeDataStore,
  loanApplyDataStore
}

export default {
  navigationDataStore,
  userDataStore,
  homeDataStore,
  loanApplyDataStore
}