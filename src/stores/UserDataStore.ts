import { observable, action, makeObservable } from 'mobx'
import { get } from 'lodash'

const DEFAULT_SETTING = {
    userName: 'Shyft User',
    emailId: 'shyft@gmail.com',
    mobileNumber: '9999999999',
    homeAddress: 'udhyog vihar, gurgaon - 122006',
    loanList: [{
      id: 1,
      loanType: 'Housing Loan',
      bankname: 'SBI',
      interestRate: 8,
      Duration: 2,
      Amount: 2000
    },
    {
      id: 2,
      loanType: 'Housing Loan',
      bankname: 'SBI',
      interestRate: 8,
      Duration: 2,
      Amount: 2000
    },
    {
      id: 3,
      loanType: 'Housing Loan',
      bankname: 'SBI',
      interestRate: 8,
      Duration: 2,
      Amount: 2000
    }]
}

export class UserDataStore {
  userName
  emailId
  mobileNumber
  homeAddress

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

  @action
  addLoanItem = (item) => {
    const currentLength = get(this.loanList, 'length')
    item.id = currentLength + 1
    this.loanList = [ ...this.loanList, item]
  }
}
