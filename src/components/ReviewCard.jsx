import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Row from './Row';
import Stars from './Stars';
import { default as theme } from '../../theme.json';
import TextMoreOrLess from './TextMoreOrLess';

const getFormattedDate = (date) => {
    const dateStr = date.toDateString(); // Thu Mar 31 2022
    const dateArr = dateStr.split(" "); // ['Thu', 'Mar', '31', '2022']
    return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
  };

const ReviewCard = ({review, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Row style={styles.row}>
        <Stars score={review.stars} />
        <Text appearance={"hint"} category={"c1"}>
          {getFormattedDate(new Date(review.CreatedAt))}
        </Text>
      </Row>
      <Text category={"s1"} style={styles.reviewTitle}>
        {review.title}
      </Text>
      <TextMoreOrLess initialLines={10}>{review.body}</TextMoreOrLess>
    </View>
  )
}

export default ReviewCard

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 10,
      paddingVertical: 15,
      borderWidth: 1,
      borderColor: theme["color-gray"],
      borderRadius: 5,
      width: 300,
      padding: 10,
    },
    row: {
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    reviewTitle: {
      fontWeight: "bold",
      marginBottom: 10,
      flexShrink: 1,
      textTransform: "capitalize",
    },
  });