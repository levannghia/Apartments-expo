import { StyleSheet, View } from 'react-native'
import React, {useState} from 'react'
import { default as theme } from '../../theme.json';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, Button } from '@ui-kitten/components';
import RecentSearchButton from './RecentSearchButton';
import { getFormattedLocationText } from '../utils/getFormattedLocationText';
import ShowMore from './ShowMore';

const RecentSearchList = ({recenSearches, style}) => {
    const [showMore, setShowMore] = useState(false)

    const getList = () => {
        if(!recenSearches || recenSearches.length > 0){
            if(recenSearches.length > 2 && !showMore){
                return (
                    <>
                        {recenSearches.map((item, index) => index > 2 ? (
                               <RecentSearchButton
                               key={item.display_name + index}
                               name={getFormattedLocationText(item)}
                               style={styles.recenSearchButton}
                           />
                        ) : null)}
                        <ShowMore text="See More"/>
                    </>
                )
            }
        }
    }
  return (
    <View>
      <Text>RecentSearchList</Text>
    </View>
  )
}

export default RecentSearchList

const styles = StyleSheet.create({
    recenSearchButton: {

    }
})