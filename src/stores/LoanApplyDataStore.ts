import { action, makeObservable, observable } from 'mobx'
import { forEach, set, find, get, map } from 'lodash'
import { ToastAndroid } from 'react-native'

import { userDataStore } from '.'
import { BANK_LIST, LOAN_TYPE_DATA } from './DummyData'
import { FIELD_TYPE, LOAN_KEY_FIELD } from '../common/Constant'
import { validateRegex } from '../utils/ValidationUtils'


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
    validationRegex: 'REGEX_VALID_NAME',
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
    validationRegex: 'REGEX_VALID_EMAIL',
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
    validationRegex: 'REGEX_VALID_CONTACT_NUMBER',
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
    validationRegex: 'YEARS_VALIDATION',
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
    validationRegex: 'YEARS_VALIDATION',
    errorMessage: 'Please enter valid amount',
    prefix: '',
    keyboardType: 'numeric',
    showErrorMessage: false
}]

const DEFAULT_SETTING = {
    formData: JSON.parse(JSON.stringify(FORM_DATA))
}

export class LoanApplyDataStore {
    REGEX_VALID_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    REGEX_VALID_NAME = /^[a-zA-Z\s]{2,}$/
    REGEX_VALID_CONTACT_NUMBER = /^[789]\d{9}$/
    YEARS_VALIDATION = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/ // /^[1-9]\d*(\.\d+)?$/
    REGEX_AMOUNT = /^[0-9]*$/

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
            set(currentItem, 'value', value)
        })
    }

    @action
    updateFormData = (newData) => {
        this.formData = [...newData]
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
       const newData =  map(this.formData, itemData => {
            if(get(itemData, 'key') === key) {
                return {
                    ...itemData,
                    value,
                    showErrorMessage: false
                }
            }
            return itemData
        })
       this.updateFormData(newData)
    }

    @action
    updatePickerValue = (id, key) => {
        const newData =  map(this.formData, itemData => {
            if(get(itemData, 'key') === key) {
                const dataList = get(itemData, 'dataList')
                const selectedItem = find(dataList, item => item.id === id)
                return {
                    ...itemData,
                    selectedItem,
                }
            }
            return itemData
        })
       this.updateFormData(newData)
    }

    getLoanParam = () => {
        const loanTypeObject = find(this.formData, item => item.key === LOAN_KEY_FIELD.LOAN_TYPE)
        const bankObject = find(this.formData, item => item.key === LOAN_KEY_FIELD.BANK)
        const durationObject = find(this.formData, item => item.key === LOAN_KEY_FIELD.DURATION)
        const amountObject = find(this.formData, item => item.key === LOAN_KEY_FIELD.AMOUNT)
        const loanData = {
            loanType: get(loanTypeObject, 'selectedItem.name', ''),
            bankname: get(bankObject, 'selectedItem.name', ''),
            interestRate: get(loanTypeObject, 'selectedItem.interestRate', ''),
            Duration: get(durationObject, 'value', ''),
            Amount: get(amountObject, 'value', '')
        }

        return loanData
    }

    onApplyPressed = () => {

        const isValid = this.validateForm()
        if (isValid) {
            const loanData = this.getLoanParam()
            userDataStore.addLoanItem(loanData)
            ToastAndroid.show('Loan Applied Successfully!', ToastAndroid.SHORT)
        }
    }

    validateForm = () => {
        let isValid = true
        const newData = map(this.formData, item => {
            const { validationRegex = '', value = '' } = item
            const result = validationRegex ? validateRegex(value, this[validationRegex]) : true
            if (!result) {
                isValid = false
                return {
                    ...item,
                    showErrorMessage: true
                }
            }
            return item
        })
        if(!isValid) {
            this.updateFormData(newData)
        }
        return isValid

    }
}
