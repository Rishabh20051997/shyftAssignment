import { makeObservable, observable } from 'mobx'
import { set } from 'lodash'
import { BANK_LIST, LOAN_TYPE_DATA } from './DummyData'

const DEFAULT_SETTING = {
  listCard: [{
    index: 0,
    isOpen: true,
    data: BANK_LIST,
    heading: 'Bank List'
  }, {
    index: 1,
    isOpen: false,
    data: LOAN_TYPE_DATA,
    heading: 'Loan Type List'
  }]
}

export class HomeDataStore {

  @observable listCard

  constructor() {
    Object.keys(DEFAULT_SETTING).forEach((key) => {
      this[key] = DEFAULT_SETTING[key]
    })
    makeObservable(this)
  }

  updateOpenStatus = (index, status) => {
    set(this.listCard, `[${index}].isOpen`, status)
  }
}
