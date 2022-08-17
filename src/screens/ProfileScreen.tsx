import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from '../common/Colors'
import { icons } from '../common/Icons'
import { STACK_NAMES } from '../navigator'
import { navigationDataStore, userDataStore } from '../stores'
import { removeUserSignInStatus } from '../utils/AuthUtils'


interface State {
  //
}
interface Props {
  //
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    marginVertical: wp('3%'),
    alignItems: 'center'
  },
  profileImageStyle: {
    height: wp('25%'),
    width: wp('25%'),
    marginHorizontal: wp('3%'),
    borderWidth: 2,
    borderRadius: wp('12.5%'),
    borderColor: colors.primaryColor
  },
  mainText: {
    fontSize: hp('3%'),
    color: colors.primaryColor
  },
  secondaryText : {
    fontSize: hp('2%'),
    color: colors.textSecondary
  },
  line: {
    borderTopWidth: 1,
    flex: 1,
    borderColor: colors.lightGray,
    marginHorizontal: 20
  },
  logoutButton : {
    marginTop: hp('5%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: 5,
    backgroundColor: colors.primaryColor
  },
  logoutButtonText: {
    fontSize: hp('2%'),
    textAlign: 'center',
    color: colors.textPrimary
  }
})

export class ProfileScreen extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  renderLine = () => {
    return <View style={styles.line} />
  }

  renderProfilePhoto = () => {
    return <Image
    source={icons.PROFILE_ICON}
    style={styles.profileImageStyle}
    />
  }

  renderUserDetails = () => {
    const { userName, emailId, mobileNumber} = userDataStore
    return <View>
      <Text 
      numberOfLines={1}
      ellipsizeMode='tail'
      style={styles.mainText}>{userName}</Text>
      <Text 
      numberOfLines={1}
      ellipsizeMode='tail'
      style={styles.secondaryText}>{emailId}</Text>
      <Text style={styles.secondaryText}>{mobileNumber}</Text>
    </View>
  }

  onLogoutPressed = () => {
    removeUserSignInStatus()
    navigationDataStore.setCurrentStackName(STACK_NAMES.LOGIN_STACK)
  }

  renderLogoutButton = () => {
    return <TouchableOpacity 
    style={styles.logoutButton}
    onPress={this.onLogoutPressed}
    >
    <Text style={styles.logoutButtonText}>{'Logout'}</Text> 
    </TouchableOpacity>
  }

  renderHeader = () => {
    return <View style={styles.headerContainer}>
{this.renderProfilePhoto()}
{this.renderUserDetails()}
    </View>
  }

  render() {
    return <View style={styles.mainView}>
      {this.renderHeader()}
      {this.renderLine()}
      {this.renderLogoutButton()}
    </View>
  }
}