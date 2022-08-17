import DeviceInfo from 'react-native-device-info'

export const TAB_KEYS = {
    HOME_TAB: 'Home',
    SEARCH_TAB: 'Search',
    PROFILE_TAB: 'Profile',
    LOAN_TAB: 'Loan'
}

export const MAIN_STACK_KEYS = {
    HOME_STACK: 'homeStack',
    SEARCH_STACK: 'searchStack',
    PROFILE_STACK: 'profileStack',
    LOAN_STACK: 'loanStack',
    TAB_BAR_STACK: 'tabBarStack'
}

export const isTablet = () => DeviceInfo.isTablet()

export enum LOAN_KEY_FIELD {
    NAME = 'NAME',
    EMAIL_ID = 'EMAIL_ID',
    MOBILE_NUMBER = 'MOBILE_NUMBER',
    HOME_ADDRESS = 'HOME_ADDRESS',
    DURATION = 'DURATION',
    BANK = 'BANK',
    LOAN_TYPE = 'LOAN_TYPE',
    AMOUNT = 'AMOUNT'
}


export enum FIELD_TYPE {
    TEXT_BOX = 'TEXT_BOX',
    PICKER = 'PICKER'
}