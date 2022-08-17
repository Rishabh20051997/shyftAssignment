import { action, makeObservable, observable } from 'mobx'
import { forEach, set, find, get } from 'lodash'
import { ToastAndroid } from 'react-native'

import { userDataStore } from '.'
import { BANK_LIST, LOAN_TYPE_DATA } from './DummyData'
import { FIELD_TYPE, LOAN_KEY_FIELD } from '../common/Constant'
import { validateRegex } from '../utils/ValidationUtils'

const REGEX_VALID_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const REGEX_VALID_NAME = /^[a-zA-Z\s]{2,}$/
const REGEX_VALID_CONTACT_NUMBER = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
const YEARS_VALIDATION = /^[1-9]\d*(\.\d+)?$/
const REGEX_AMOUNT = /^[0-9]*$/

const FORM_DATA = [{
    key: LOAN_KEY_FIELD.BANK,
    type: FIELD_TYPE.PICKER,
    placeholder: '',
    validationRegex: '',
    errorMessage: '',
    prefix: '',
    keyboardType: '',
    dataList: BANK_LIST,
    selectedItem: BANK_LIST[0]
},
{
    key: LOAN_KEY_FIELD.LOAN_TYPE,
    type: FIELD_TYPE.PICKER,
    placeholder: '',
    validationRegex: '',
    errorMessage: '',
    prefix: '',
    keyboardType: '',
    dataList: LOAN_TYPE_DATA,
    selectedItem: LOAN_TYPE_DATA[0]
}, {
    key: LOAN_KEY_FIELD.NAME,
    type: FIELD_TYPE.TEXT_BOX,
    value: '',
    placeholder: 'Enter Your Name',
    defaultValue: '',
    validationRegex: REGEX_VALID_NAME,
    errorMessage: 'Please enter valid name',
    prefix: '',
    keyboardType: 'default',
    showErrorMessage: false
},
{
    key: LOAN_KEY_FIELD.EMAIL_ID,
    type: FIELD_TYPE.TEXT_BOX,
    placeholder: 'Enter Your Email Id',
    value: '',
    defaultValue: '',
    validationRegex: REGEX_VALID_EMAIL,
    errorMessage: 'Please enter valid email',
    prefix: '',
    keyboardType: 'email-address',
    showErrorMessage: false
},
{
    key: LOAN_KEY_FIELD.MOBILE_NUMBER,
    type: FIELD_TYPE.TEXT_BOX,
    placeholder: 'Enter Your Mobile Number',
    value: '',
    defaultValue: '',
    validationRegex: REGEX_VALID_CONTACT_NUMBER,
    errorMessage: 'Please enter valid Mobile Number',
    prefix: '+91',
    keyboardType: 'number-pad',
    showErrorMessage: false
},
{
    key: LOAN_KEY_FIELD.HOME_ADDRESS,
    type: FIELD_TYPE.TEXT_BOX,
    placeholder: 'Enter Your Home Address',
    value: '',
    defaultValue: '',
    validationRegex: '',
    errorMessage: 'Please enter valid Home Address',
    prefix: '',
    keyboardType: 'default',
    showErrorMessage: false
},
{
    key: LOAN_KEY_FIELD.DURATION,
    type: FIELD_TYPE.TEXT_BOX,
    placeholder: 'Enter Duration in Years',
    value: '',
    validationRegex: YEARS_VALIDATION,
    errorMessage: 'Please enter valid Duration',
    prefix: '',
    keyboardType: 'numeric',
    showErrorMessage: false
},
{
    key: LOAN_KEY_FIELD.AMOUNT,
    type: FIELD_TYPE.TEXT_BOX,
    placeholder: 'Enter Amount in Rupees (Numeric)',
    value: '',
    validationRegex: REGEX_AMOUNT,
    errorMessage: 'Please enter valid amount',
    prefix: '',
    keyboardType: 'numeric',
    showErrorMessage: false
}]

const DEFAULT_SETTING = {
    formData: JSON.parse(JSON.stringify(FORM_DATA))
}

export class LoanApplyDataStore {

    @observable formData

    constructor() {
        this.init()
        makeObservable(this)
    }

    init = () => {
        Object.keys(DEFAULT_SETTING).forEach((key) => {
            this[key] = DEFAULT_SETTING[key]
        })
    }

    @action
    initialiseData = (selectedBankId, selectedLoanTypeId) => {
        this.setDefaultValues()
        if (selectedBankId) {
            this.updateSelectedBank(selectedBankId)

        }
        if (selectedLoanTypeId) {
            this.updateSelectedLoanType(selectedLoanTypeId)
        }
    }

    setDefaultValues = () => {
        const arr = [{
            key: LOAN_KEY_FIELD.NAME,
            value: userDataStore.userName
        },
        {
            key: LOAN_KEY_FIELD.EMAIL_ID,
            value: userDataStore.emailId
        },
        {
            key: LOAN_KEY_FIELD.MOBILE_NUMBER,
            value: userDataStore.mobileNumber
        },
        {
            key: LOAN_KEY_FIELD.HOME_ADDRESS,
            value: userDataStore.homeAddress
        }]

        forEach(arr, item => {
            const { key, value } = item
            const currentItem = find(this.formData, itemData => get(itemData, 'key') === key)
            set(currentItem, 'defaultValue', value)
            set(currentItem, 'value', value)
        })
    }

    updateSelectedBank = (bankId) => {
        const bankItem = find(this.formData, itemData => get(itemData, 'key') === LOAN_KEY_FIELD.BANK)
        const selectedItem = find(BANK_LIST, itemData => get(itemData, 'id') === bankId)

        set(bankItem, 'selectedItem', selectedItem)
    }

    updateSelectedLoanType = (loanTypeId) => {
        const loanItem = find(this.formData, itemData => get(itemData, 'key') === LOAN_KEY_FIELD.LOAN_TYPE)
        const selectedItem = find(LOAN_TYPE_DATA, itemData => get(itemData, 'id') === loanTypeId)

        set(loanItem, 'selectedItem', selectedItem)
    }

    @action
    updateTextValue = (value, key) => {
        const loanItem = find(this.formData, itemData => get(itemData, 'key') === key)
        set(loanItem, 'value', value)
        set(loanItem, 'showErrorMessage', false)
    }

    @action
    updatePickerValue = (id, key) => {
        const loanItem = find(this.formData, itemData => get(itemData, 'key') === key)
        const data = get(loanItem, 'dataList')
        const selectedItem = find(data, item => item.id === id)
        set(loanItem, 'selectedItem', selectedItem)
    }

    onApplyPressed = () => {

        const isValid = this.validateForm()
        if (isValid) {
            const loanData  = {
                loanType: get(this.formData, `[${LOAN_KEY_FIELD.LOAN_TYPE}].selectedItem.name`, ''),
                bankname: get(this.formData, `[${LOAN_KEY_FIELD.BANK}].selectedItem.name`, ''),
                interestRate: get(this.formData, `[${LOAN_KEY_FIELD.LOAN_TYPE}].selectedItem.interestRate`, ''),
                Duration: get(this.formData, `[${LOAN_KEY_FIELD.DURATION}].value`, ''),
                Amount: get(this.formData, `[${LOAN_KEY_FIELD.AMOUNT}].value`, '')
            }
            userDataStore.addLoanItem(loanData)
            ToastAndroid.show('Loan Applied Successfully!', ToastAndroid.SHORT)
        }
    }

    validateForm = () => {
        let isValid = true
        forEach(this.formData, item => {
            const { validationRegex = '', value = '' } = item
                const result = validationRegex ? validateRegex(value, validationRegex) : true
                if (!result) {
                    isValid = false
                    set(item, 'showErrorMessage', true)
                }
        })
        return isValid

    }
}
