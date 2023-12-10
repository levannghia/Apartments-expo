import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { default as theme } from '../../theme.json';
import { Text } from '@ui-kitten/components';
import Row from './Row';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { openURL } from '../utils/openURL';

const ScoreCard = ({ score, style}) => {
    const handlePress = () => {
        const url = "https://www.redfin.com/how-walk-score-works";
        openURL(url);
      };
    
      return (
        <Pressable
          onPress={handlePress}
          style={({ pressed }) =>
            pressed
              ? [styles.container, style, styles.activeBackground]
              : [styles.container, style]
          }
        >
          <Row style={styles.row}>
            <Text category={"h6"} style={styles.mainText}>
              {score.type} Score
              <MaterialCommunityIcons
                name={"registered-trademark"}
                size={16}
                color={"black"}
              />
            </Text>
            <Text category={"h6"}>{score.score}</Text>
          </Row>
    
          <Text category={"s1"}>{score.description}</Text>
        </Pressable>
      );
}

export default ScoreCard

const styles = StyleSheet.create({})