import { StyleSheet, View, Platform, Image } from 'react-native'
import React, {useState} from 'react'
import { Text } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { properties } from '../data/properties'
import { useAuth } from '../hooks/useAuth'
import { Screen } from '../components/screen'
import { LISTMARGIN } from '../../constant'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ModalHeader from '../components/ModalHeader'
import Row from '../components/Row'

const MessageScreen = ({route}) => {
    const navigation = useNavigation();
    const {propertyID} = route.params;
    const index = properties.findIndex((i) => i.ID === propertyID);
    const property = properties[index];
    const [pickedDate, setPickedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const {user} = useAuth()
  return (
    <KeyboardAwareScrollView bounces={false}>
        <Screen style={styles.container}>
            {Platform.OS === 'ios' ? <ModalHeader /> : null}
            <Row style={styles.row}>
                <Image style={styles.image} source={{uri: property.images[0]}}/>
                <View style={styles.address}>

                </View>
            </Row>
        </Screen>
    </KeyboardAwareScrollView>
  )
}

export default MessageScreen

const styles = StyleSheet.create({
    container: {
        marginHorizontal: LISTMARGIN
    },
    row: {

    },
    image: {

    },
    address: {
        
    }
})