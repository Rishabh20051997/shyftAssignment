import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from '../common/Colors'

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  headerSearchBar: {
    paddingVertical: 15,
    paddingHorizontal: hp('2%'),
    paddingTop: hp('2%'),
    backgroundColor: colors.primaryColor
  },
  searchField: {
    backgroundColor: colors.white,
    borderRadius:50,
    paddingHorizontal:10,
    paddingRight:40,
    fontSize:16
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentText : {
    fontSize: hp('5%'),
    textAlign: 'center',
    color: colors.primaryColor
  },
})

interface State {
  searchText: string
  //
}
interface Props {
  //
}

export class SearchScreen extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }

  onChangeSearchText = (value) => {
    this.setState({
      searchText: value
    })
  }

  renderHeader() {
    const SEARCH_PLACEHOLDER = 'Search for Banks'
    const { searchText } = this.state

    return <View style={styles.headerSearchBar}>
        <TextInput
          placeholder={SEARCH_PLACEHOLDER}
          autoFocus={true}
          style={styles.searchField}
          value={searchText}
          onChangeText={(value) => this.onChangeSearchText(value)}
        />
    </View>
  }

  renderContainer = () => {
    return <View style={styles.contentContainer}>
     <Text style={styles.contentText}>Not Working Right Now!!!</Text>
     </View>
  }

  render() {
    return <View style={styles.mainView}>
        {this.renderHeader()}
        {this.renderContainer()}
    </View>
  }
}