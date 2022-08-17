import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from '../common/Colors'
import { userDataStore } from '../stores'


interface State {
  //
}
interface Props {
  //
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1
},
headerContainer: {
    flexDirection: 'row',
    padding: hp('1%'),
    backgroundColor: colors.primaryColor
},
headingText: {
    fontSize: hp('3%'),
    color: colors.textPrimary
},
itemSepratorView: {
    margin: 10
},
mainContentContainer: {
    margin: 10,
},
cardItemConatiner: {
  borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
  // height: hp('8%'),
  borderColor: colors.lightGray,
  borderRadius: 5,
  width: '45%',
  marginHorizontal: '2.5%'
},
headingtext: {
  fontSize: hp('2.5%'),
  color: colors.primaryColor
},
secondarytext: {
  fontSize: hp('2%'),
  color: colors.black
},
tertiarytext: {
  fontSize: hp('2%'),
  color: colors.textTertiary
}
})

export class LoanScreen extends Component<Props, State> {
  constructor(props) {
    super(props)
  }

  renderHeader = () => {
    return <View style={styles.headerContainer}>
        <Text style={styles.headingText}>{'Applied Loans'}</Text>
    </View>
}

renderCardItem = ({ item }) => {
  const { loanType, bankname, interestRate, Amount, Duration } = item
  return <View style={styles.cardItemConatiner} >
    <Text style={styles.headingtext} ellipsizeMode='tail' numberOfLines={1}>{loanType}</Text>
    <Text style={styles.secondarytext} ellipsizeMode='tail' numberOfLines={1}>{bankname}</Text>
    <Text style={styles.tertiarytext} ellipsizeMode='tail' numberOfLines={1}>Duration: {Duration} Year(s)</Text>
    <Text style={styles.tertiarytext} ellipsizeMode='tail' numberOfLines={1}>Amount: ₹{Amount}</Text>
    <Text style={styles.tertiarytext} ellipsizeMode='tail' numberOfLines={1}>Interest Rate: @{interestRate}%</Text>
  </View>
}

renderLoanList = () => {
  const { loanList } = userDataStore
  return <FlatList
  data={loanList}
  renderItem={this.renderCardItem}
  keyExtractor={(item, index) => item + index}
  ItemSeparatorComponent={() => <View style={styles.itemSepratorView} />}
  style={styles.mainContentContainer}
  numColumns={2}
/>
}

  render() {
    return <View style={styles.mainView}>
{this.renderHeader()}
{this.renderLoanList()}
    </View>
  }
}