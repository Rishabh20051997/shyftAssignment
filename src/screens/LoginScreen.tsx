import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'


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

export class LoginScreen extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  render() {
    return <View style={styles.mainView}>
        <Text>Login Page</Text>
    </View>
  }
}