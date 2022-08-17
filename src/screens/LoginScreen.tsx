import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from '../common/Colors'
import { STACK_NAMES } from '../navigator'
import { navigationDataStore } from '../stores'
import { setUserSignedIn } from '../utils/AuthUtils'

interface State {
  //
}
interface Props {
  //
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText : {
    fontSize: hp('5%'),
    textAlign: 'center',
    color: colors.primaryColor
  },
  loginButton : {
    marginTop: hp('5%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: 5,
    backgroundColor: colors.primaryColor
  },
  loginButtonText: {
    fontSize: hp('2%'),
    textAlign: 'center',
    color: colors.textPrimary
  }
})

export class LoginScreen extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  onLoginPressed = () => {
    setUserSignedIn()
    navigationDataStore.setCurrentStackName(STACK_NAMES.HOME_STACK)
  }

  render() {
    return <View style={styles.mainView}>
        <Text style={styles.headingText}>Sign In</Text>
        <TouchableOpacity 
        style={styles.loginButton}
        onPress={this.onLoginPressed}
        >
        <Text style={styles.loginButtonText}>{'Press Here to Login'}</Text> 
        </TouchableOpacity>
    </View>
  }
}