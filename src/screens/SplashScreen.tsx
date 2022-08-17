import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from '../common/Colors'


interface State {
  //
}
interface Props {
  //
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    
    justifyContent: 'center'
  },
  mainText: {
    fontSize: hp('10%'),
    color: colors.textPrimary,
    textAlign: 'center'
  },
  secondaryText: {
    fontSize: hp('7%'),
    color: colors.textPrimary,
    textAlign: 'center'
  }
})

export class SplashPage extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  render() {
    return <View style={styles.mainView}>
        <Text style={styles.mainText}>{'Shyft'}</Text>
        <Text style={styles.secondaryText}>{'Assignment'}</Text>
    </View>
  }
}