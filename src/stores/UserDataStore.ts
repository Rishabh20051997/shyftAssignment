import { observable, action, makeObservable } from 'mobx'

const DEFAULT_SETTING = {
    userName: 'Shyft User',
    emailId: 'shyft@gmail.com',
    mobileNumber: '999999999999',
    loanList: []
}

export class UserDataStore {
  userName
  emailId
  mobileNumber

  @observable loanList

  constructor() {
    Object.keys(DEFAULT_SETTING).forEach((key) => {
      this[key] = DEFAULT_SETTING[key]
    })
    makeObservable(this)
  }

  @action
  updateloanList(loanList) {
    this.loanList = loanList
  }
}
