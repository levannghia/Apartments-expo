import { StyleSheet, View, Platform, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Screen } from '../components/screen'
import ModalHeader from '../components/ModalHeader'
import { Button, Input, Text } from '@ui-kitten/components'
import { default as theme } from '../../theme.json';
import Row from '../components/Row'
import { useNavigation } from '@react-navigation/native'
import { LISTMARGIN } from '../../constant'
import { getSuggestedLocation } from '../services/location'
import { debounce } from 'lodash'
import { getFormattedLocationText } from '../utils/getFormattedLocationText'
import CurrentLocationButton from '../components/CurrentLocationButton'
import RecentSearchList from '../components/RecentSearchList'
import { useQueryClient } from 'react-query'

const FindLocationScreen = () => {
    const [value, setValue] = useState("");
    const [suggestions, setSuggestion] = useState([])
    const navigation = useNavigation()
    const queryClient = useQueryClient()
    const recentSearches = queryClient.getQueryData("recentSearches")
    const setRecentSearch = (location) => {
        queryClient.setQueryData("recentSearches", () => {
            if (recentSearches) {
                let included = false;
                for (let i of recentSearches) {
                    if (
                        i.display_name === location.display_name &&
                        i.lon === location.lon &&
                        i.lat === location.lat
                    ) {
                        included = true;
                        break;
                    }
                }
                if (!included) return [location, ...recentSearches];
                return recentSearches;
            }
            return [location];
        });
    }
    // console.log(recentSearches);
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
        } else {
            setSuggestion([])
        }
    }

    const handleNavigate = (location) => {
        setRecentSearch(location);
        navigation.navigate('Root', {
            screen: 'Search',
            params: {
                location: getFormattedLocationText(location),
                lat: location.lat,
                lon: location.lon,
                boundingBox: location.boundingbox
            }
        })
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

    const SuggestedText = ({ locationItem }) => {
        const location = getFormattedLocationText(locationItem, "auto");
        return (
            <Row style={styles.suggestionContainer}>
                <Text>{location}</Text>
            </Row>
        )
    }

    return (
        <Screen>
            {Platform.OS === 'ios' && <ModalHeader />}
            <View style={{ marginHorizontal: LISTMARGIN }}>
                {getInput()}
                {suggestions.length > 0 ?
                    (<FlatList
                        keyExtractor={(item, index) => item.place_id + index}
                        data={suggestions}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleNavigate(item)}>
                                <SuggestedText locationItem={item} />
                            </TouchableOpacity>
                        )}
                    />)
                    : (
                        <ScrollView bounces={false}>
                            <CurrentLocationButton style={styles.CurrentLocationButton} />
                            <RecentSearchList recentSearches={recentSearches} style={styles.recentSearchContainer} />
                        </ScrollView>
                    )
                }
            </View>
        </Screen>
    )
}

export default FindLocationScreen

const styles = StyleSheet.create({
    defaultMarginTop: {
        marginTop: 10,

    },

    suggestionContainer: {
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#d4d4d4',
    },

    CurrentLocationButton: {
        marginTop: 30
    },
    
    recentSearchContainer: { marginTop: 30 },
})