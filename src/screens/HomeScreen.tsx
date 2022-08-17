import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'


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
    justifyContent: 'center'
  }
})

export class HomeScreen extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  render() {
    return <View style={styles.mainView}>
        <Text>Home Page</Text>
    </View>
  }
}