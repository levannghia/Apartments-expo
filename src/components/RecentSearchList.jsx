import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Text, Button } from '@ui-kitten/components';
import RecentSearchButton from './RecentSearchButton';
import { getFormattedLocationText } from '../utils/getFormattedLocationText';

const RecentSearchList = ({ recentSearches, style }) => {
    const [showMore, setShowMore] = useState(false)
    const handleButtonPress = () => setShowMore(!showMore);

    const handleRecentSearchButtonPress = (location) => {
        navigation.navigate("Root", {
            screen: "Search",
            params: {
                location: getFormattedLocationText(location, "autocomplete"),
                lat: location.lat,
                lon: location.lon,
                boundingBox: location.boundingbox,
            },
        });
    };

    const ShowButton = ({ text }) => (
        <Button
            appearance={"ghost"}
            status={"info"}
            style={styles.showButton}
            onPress={handleButtonPress}
        >
            {text}
        </Button>
    );

    const getList = () => {
        if (!recentSearches || recentSearches.length === 0) return;
        if (recentSearches.length > 2 && !showMore) {
            return (
                <>
                    {recentSearches.map((item, index) => index > 2 ? (
                        <RecentSearchButton
                            key={item.display_name + index}
                            name={getFormattedLocationText(item, 'autocomplete')}
                            style={styles.recentSearchButton}
                            onPress={() => handleRecentSearchButtonPress(item)}
                        />
                    ) : null)}
                    <ShowMore text="See More" />
                </>
            )
        } else {
            return (
                <>
                    {recentSearches.map((item, index) => (
                        <RecentSearchButton
                            key={item.display_name + index}
                            name={getFormattedLocationText(item, "autocomplete")}
                            style={styles.recentSearchButton}
                            onPress={() => handleRecentSearchButtonPress(item)}
                        />
                    ))}
                    {recentSearches.length > 2 ? <ShowButton text="See Less" /> : null}
                </>
            );
        }
    }
    return (
        <View style={style}>{getList()}</View>
    )
}

export default RecentSearchList

const styles = StyleSheet.create({
    recentSearchButton: { marginVertical: 5 },
    showButton: { alignSelf: "flex-start" },
})