import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { observer } from 'mobx-react'
import { get, map } from 'lodash'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { colors } from '../common/Colors'
import { loanApplyDataStore } from '../stores'
import { FIELD_TYPE } from '../common/Constant'


interface State {
    //
}
interface Props {
    route
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
        const { key, value, placeholder, defaultValue, keyboardType, prefix, errorMessage, showErrorMessage } = item
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
                />
            </View>
        </View>
            {showErrorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </>

    }

    renderCardItem = ({ item }) => {
        const { type } = item
        switch (type) {
            case FIELD_TYPE.PICKER:
                return this.renderPicker(item)

            case FIELD_TYPE.TEXT_BOX:
                return this.renderTextBox(item)

            default:
                return null
        }

    }

    renderContent = () => {
        const { formData } = loanApplyDataStore
        console.log('renderContent : ', formData)
        return <FlatList
            data={formData}
            renderItem={this.renderCardItem}
            keyExtractor={(item, index) => item + index}
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
            {this.renderContent()}
            {this.renderSaveButton()}
        </View>
    }
}