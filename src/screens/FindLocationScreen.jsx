import { StyleSheet, Text, View, Platform } from 'react-native'
import React, { useState } from 'react'
import { Screen } from '../components/screen'
import ModalHeader from '../components/ModalHeader'
import { Button, Input } from '@ui-kitten/components'
import { default as theme } from '../../theme.json';
import Row from '../components/Row'
import { useNavigation } from '@react-navigation/native'
import { LISTMARGIN } from '../../constant'
import { getSuggestedLocation } from '../services/location'
import { debounce } from 'lodash'

const FindLocationScreen = () => {
    const [value, setValue] = useState("");
    const [suggestions, setSuggestion] = useState([])
    const navigation = useNavigation()

    const handleSubmitEditing = async () => {
        const locations = await getSuggestedLocation(value)
        if (location.length > 0) {
            console.log("navigation to search passing in ", locations[0]);
        }

    }

    const handleChange = async (val) => {
        setValue(val)

        if (val.length > 2) {
            const debounceSearch = debounce(async () => {
                const locations = await getSuggestedLocation(value)
                if (locations.length > 0) {
                    setSuggestion(locations)
                } else if (val.length === 0) {
                    setSuggestion([])
                }
            }, 500)

            debounceSearch();
        }else{
            setSuggestion([])
        }
    }

    const getInput = () => {
        if (Platform.OS === 'ios') {
            return (
                <Input keyboardType='default'
                    autoFocus
                    selectionColor={theme['color-primary-500']}
                    placeholder='Enter Location'
                    size={'large'}
                    value={value}
                    onChangeText={handleChange}
                    onSubmitEditing={handleSubmitEditing}
                    style={styles.defaultMarginTop}
                />
            )
        }

        return (
            <Row style={{ alignItems: 'center' }}>
                <Input keyboardType='default'
                    autoFocus
                    selectionColor={theme['color-primary-500']}
                    placeholder='Enter Location'
                    size={'large'}
                    value={value}
                    onChangeText={handleChange}
                    onSubmitEditing={handleSubmitEditing}
                    style={[styles.defaultMarginTop, { width: '80%' }]}
                />
                <Button appearance='ghost' status='info' onPress={navigation.goBack}>Cancel</Button>
            </Row>
        )
    }

    return (
        <Screen>
            {Platform.OS === 'ios' && <ModalHeader />}
            <View style={{ marginHorizontal: LISTMARGIN }}>
                {getInput()}
            </View>
        </Screen>
    )
}

export default FindLocationScreen

const styles = StyleSheet.create({
    defaultMarginTop: {
        marginTop: 10,

    }
})