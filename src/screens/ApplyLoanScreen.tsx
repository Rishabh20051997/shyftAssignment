import React, { Component, PureComponent } from 'react'
import { View, StyleSheet, Text, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { observer } from 'mobx-react'
import { get, map } from 'lodash'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { colors } from '../common/Colors'
import { loanApplyDataStore } from '../stores'
import { FIELD_TYPE } from '../common/Constant'


interface State {
    //
}
interface Props {
    route
}

interface IProps {
    item
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
    textBoxContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.lightGray
    },
    textBoxInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    prefixText: {
        textAlign: 'center',
        color: colors.lightGray,
        paddingLeft: 5
    },
    textBoxStyle: {
        padding: 5,
        width: '100%'
    },
    saveButton: {
        borderRadius: 4,
        backgroundColor: colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45
    },
    saveButtonText: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '500'
    },
    errorText: {
        color: colors.errorColor
    }

})

export class ApplyLoanComponent extends PureComponent<IProps, State> {

    // shouldComponentUpdate(nextProps: Readonly<IProps>): boolean {
    //     const { item: { value, selectedItem = {} } } = nextProps
    //     const { item: { value: currentValue, selectedItem: currentSelectedValue = {} } } = this.props
    //     console.log('\n\n\n^^^^^^^shouldComponentUpdate called : ', value, currentValue)
    //     if (currentValue !== value ||
    //         JSON.parse(JSON.stringify(currentSelectedValue)) !== JSON.parse(JSON.stringify(selectedItem))) {
    //         return true
    //     }
    //     return false
    // }

    onPickerChanged = (id, key) => {
        loanApplyDataStore.updatePickerValue(id, key)
    }

    renderPicker = (item) => {
        const { dataList, selectedItem, key } = item
        const selectedId = get(selectedItem, 'id')
        return <View style={styles.textBoxContainer}>
            <Picker
                selectedValue={selectedId}
                onValueChange={(itemValue) =>
                    this.onPickerChanged(itemValue, key)
                }>
                {map(dataList, dataItem => {
                    const { id, name } = dataItem
                    return <Picker.Item label={name} value={id} />
                })}
            </Picker>
        </View>
    }

    onTextChange = (value, key) => {
        loanApplyDataStore.updateTextValue(value, key)
    }


    renderTextBox = (item) => {
        const { key, value, placeholder, keyboardType, prefix, errorMessage, showErrorMessage } = item
        return <><View style={styles.textBoxContainer}>
            <View style={styles.textBoxInnerContainer}>
                {prefix ?
                    <Text style={styles.prefixText}>{prefix}</Text>
                    : null}
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    keyboardType={keyboardType || 'default'}
                    style={styles.textBoxStyle}
                    onChangeText={(textValue) => this.onTextChange(textValue, key)}
                    autoFocus={false}

                    removeClippedSubviews={false}
                />
            </View>
        </View>
            {showErrorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </>

    }


    render = () => {
        const { item } = this.props
        const { type } = item
        // console.log('\n\n\n 1 level called : ', item)
        switch (type) {
            case FIELD_TYPE.PICKER:
                return this.renderPicker(item)

            case FIELD_TYPE.TEXT_BOX:
                return this.renderTextBox(item)

            default:
                return null
        }
    }
}

@observer
export class ApplyLoanScreen extends Component<Props, State> {
    constructor(props) {
        super(props)
        const bankId = get(props, 'route.params.bankId', '')
        const loanTypeId = get(props, 'route.params.loanTypeId', '')
        loanApplyDataStore.initialiseData(bankId, loanTypeId)

    }

    componentWillUnmount = () => {
        loanApplyDataStore.init()
    }

    renderHeader = () => {
        return <View style={styles.headerContainer}>
            <Text style={styles.headingText}>{'Apply For Loan'}</Text>
        </View>
    }

    renderCardItem = ({ item }) => {
        return <ApplyLoanComponent item={item} />
    }

    renderContent = () => {
        const { formData } = loanApplyDataStore
        // console.log('\n\n\n$$$$$ renderContent : ', formData[2])
        return <FlatList
            data={formData}
            renderItem={this.renderCardItem}
            keyExtractor={(item, index) => index + ''}
            ItemSeparatorComponent={() => <View style={styles.itemSepratorView} />}
            style={styles.mainContentContainer}
        />
    }

    onSaveBtnPress = () => {
        loanApplyDataStore.onApplyPressed()
        //
    }

    renderSaveButton = () => {
        return (
            <TouchableOpacity
                onPress={() => this.onSaveBtnPress()}
                style={[styles.saveButton]}
            >
                <Text style={styles.saveButtonText}>Apply Loan</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return <View style={styles.mainView}>
            {this.renderHeader()}
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
            >
                {this.renderContent()}
            </KeyboardAwareScrollView>
            {this.renderSaveButton()}
        </View>
    }
}