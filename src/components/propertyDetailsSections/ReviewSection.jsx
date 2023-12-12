import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import { Text, Button } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { getStateAbbreviation } from '../../utils/getStateAbbreviation'
import { LISTMARGIN } from '../../../constant'
import OverallReviewScoreCard from '../OverallReviewScoreCard'
import ReviewCard from '../ReviewCard'

const ReviewSection = ({ property }) => {
    const navigation = useNavigation();
    return (
        <>
            <Text category={"h5"} style={styles.defaultMarginVertical}>
                Reviews
            </Text>
            {property.reviews ? (
                <>
                    <OverallReviewScoreCard
                        numberOfReviews={property.reviews ? property.reviews.length : 0}
                        score={property.stars}
                        style={styles.defaultMarginVertical}
                    />
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.flatListMargin}
                        data={property.reviews}
                        keyExtractor={(item) => item.ID.toString()}
                        renderItem={({ item }) => <ReviewCard review={item} />}
                    />
                </>
            ) : (
                <Text>No reviews yet. Be the first one to review this property.</Text>
            )}

            <Button
                onPress={() =>
                    navigation.navigate("Review", {
                        propertyID: property.ID,
                        propertyName: property?.name
                            ? property.name
                            : `${property.street}, ${getStateAbbreviation(property.state)}, ${property.zip
                            }`,
                    })
                }
                style={styles.defaultMarginVertical}
            >
                Write a Review
            </Button>
        </>
    )
}

export default ReviewSection

const styles = StyleSheet.create({
    defaultMarginVertical: { marginVertical: LISTMARGIN },
    flatListMargin: { marginBottom: 50 },
});