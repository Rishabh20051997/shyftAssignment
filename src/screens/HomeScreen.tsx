import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, SectionList, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from '../common/Colors'
import { icons } from '../common/Icons'
import { homeDataStore, userDataStore } from '../stores'


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
    mainContentContainer: {
        margin: 5,
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
    profileImageStyle: {
        height: hp('5%'),
        width: hp('5%'),
        marginHorizontal: wp('3%'),
    },
    cardImageStyle: {
        height: hp('5%'),
        width: hp('5%'),
        marginLeft: wp('3%'),
    },
    sectionheader: {
        fontSize: hp('2%'),
        color: colors.black,
        fontWeight: 'bold',
        paddingVertical: hp('1%')
    },
    cardItemConatiner: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: hp('6%'),
        borderColor: colors.lightGray,
        borderRadius: 5
    },
    cardItemInnerConatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp('6%')
    },
    cardtextStyle: {
        fontSize: hp('2%'),
        color: colors.textSecondary,
        marginHorizontal: wp('3%'),
    },
    applyNowtextStyle: {
        fontSize: hp('2%'),
        color: colors.primaryColor,
        marginHorizontal: wp('3%'),
    },
    itemSepratorView: {
        margin: 5
    }
})

export class HomeScreen extends Component<Props, State> {
    constructor(props) {
        super(props)
    }

    renderProfilePhoto = () => {
        return <Image
            source={icons.PROFILE_ICON}
            style={styles.profileImageStyle}
        />
    }

    renderGreeeting = () => {
        const message = `Hello ${userDataStore.userName}!`
        return <Text style={styles.headingText}>{message}</Text>
    }

    renderHeader = () => {
        return <View style={styles.headerContainer}>
            {this.renderProfilePhoto()}
            {this.renderGreeeting()}
        </View>
    }

    onApplyPressed = () => {
        alert('Hello')
    }

    renderCardItem = ({ item }) => {
        // return null
        const { icon, name } = item
        return <TouchableOpacity
            onPress={this.onApplyPressed}
            style={styles.cardItemConatiner} >
            <View style={styles.cardItemInnerConatiner}>
                {icon ? <Image
                    source={icon}
                    style={styles.cardImageStyle}
                /> : null}
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.cardtextStyle}>{name}</Text>
            </View>
            <View>
                <Text style={styles.applyNowtextStyle}>{'Apply Now'}</Text>
            </View>
        </TouchableOpacity>
    }

    renderSectionHeader = ({ section: { heading = '' } }) => {
        return <Text style={styles.sectionheader}>{heading}</Text>
    }

    renderContent = () => {
        const { listCard } = homeDataStore
        return <SectionList
            sections={listCard}
            renderItem={this.renderCardItem}
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={this.renderSectionHeader}
            ItemSeparatorComponent={() => <View style={styles.itemSepratorView} />}
            style={styles.mainContentContainer}
        />
    }


    render() {
        return <View style={styles.mainView}>
            {this.renderHeader()}
            {this.renderContent()}
        </View>
    }
}