import AsyncStorage from '@react-native-async-storage/async-storage'

export const SIGN_IN_KEY = 'SIGN_IN_KEY'

export const isUserSignedIn = async () => {
    return false
    // const value = await AsyncStorage.getItem(SIGN_IN_KEY)
    // return value
}

export const setUserSignedIn = async (authToken) => {
    AsyncStorage.setItem(SIGN_IN_KEY, authToken)
}