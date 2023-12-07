import { StyleSheet, View, Platform, Image, } from 'react-native'
import React, { useState } from 'react'
import { Text, Input, Button } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { properties } from '../data/properties'
import { useAuth } from '../hooks/useAuth'
import { Screen } from '../components/screen'
import { LISTMARGIN } from '../../constant'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ModalHeader from '../components/ModalHeader'
import Row from '../components/Row'
import { getStateAbbreviation } from '../utils/getStateAbbreviation'
import { PressableInput } from '../components/PressableInput'
import DateTimePicker from "react-native-modal-datetime-picker";
import { Formik } from 'formik'
import * as yup from "yup";

const MessagePropertyScreen = ({ route }) => {
    const navigation = useNavigation();
    const { propertyID, tour } = route.params;
    const index = properties.findIndex((i) => i.ID === propertyID);
    const property = properties[index];
    const [pickedDate, setPickedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const { user } = useAuth()
    return (
        <KeyboardAwareScrollView bounces={false}>
            <Screen style={styles.container}>
                {Platform.OS === 'ios' ? <ModalHeader /> : null}
                <Row style={styles.row}>
                    {property.images && property.images.length > 0 ? (<Image style={styles.image} source={{ uri: property.images[0] }} />) : null}
                    <View style={styles.address}>
                        {property?.name ? (
                            <Text category={"s1"}>{property.name}</Text>
                        ) : null}
                        <Text category={"c1"}>
                            {property.street}, {property.city},{" "}
                            {getStateAbbreviation(property.state)} {property.zip}
                        </Text>
                        <Text category={"c1"}>
                            ${property.rentLow.toLocaleString()} -{" "}
                            {property.rentHigh.toLocaleString()} | {property.bedroomLow} -{" "}
                            {property.bedroomHigh} Beds
                        </Text>
                    </View>
                    <Formik
                        initialValues={{
                            userName: user ? user.name : '',
                            phoneNumber: "",
                            email: user ? user.email : '',
                            message: tour ? "I would like to schedule a tour." : "",
                            date: new Date(),
                            showCalendar: false,
                        }}
                        validationSchema={yup.object().shape({
                            userName: yup.string().required("Required"),
                            phoneNumber: yup.string(),
                            email: yup.string().email().required("Required"),
                            message: yup.string().required("Required"),
                            date: yup.date().required("Required"),
                            showCalendar: yup.bool(),
                        })}

                        onSubmit={(values) => {
                            console.log("OK");
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            setFieldTouched,
                            setFieldValue,
                        }) => (
                            <>
                                <Input
                                    style={styles.input}
                                    value={values.userName}
                                    onChangeText={handleChange("userName")}
                                    placeholder="Your name"
                                    keyboardType="default"
                                    label="Your Name*"
                                    onBlur={() => setFieldTouched("userName")}
                                    caption={
                                        touched.userName && errors.userName
                                            ? errors.userName
                                            : undefined
                                    }
                                    status={
                                        touched.userName && errors.userName ? "danger" : "basic"
                                    }
                                />
                                <Input
                                    style={styles.input}
                                    value={values.phoneNumber}
                                    onChangeText={handleChange("phoneNumber")}
                                    placeholder="Your phone number"
                                    keyboardType="number-pad"
                                    label="Phone Number"
                                />
                                <Input
                                    style={styles.input}
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    placeholder="Your Email Address"
                                    keyboardType="email-address"
                                    label="Email*"
                                    onBlur={() => setFieldTouched("email")}
                                    caption={
                                        touched.email && errors.email ? errors.email : undefined
                                    }
                                    status={touched.email && errors.email ? "danger" : "basic"}
                                />

                                <PressableInput
                                    style={styles.input}
                                    label="Move-In Date"
                                    value={values.date.toDateString()}
                                    onPress={() => setFieldValue("showCalendar", true)}
                                />

                                <DateTimePicker
                                    isVisible={values.showCalendar}
                                    mode="date"
                                    onConfirm={(selectedDate) => {
                                        if (selectedDate) {
                                            setFieldValue("showCalendar", false);
                                            setFieldValue("date", selectedDate);
                                        }
                                    }}
                                    onCancel={() => setFieldValue("showCalendar", false)}
                                />

                                <Input
                                    style={styles.input}
                                    value={values.message}
                                    onChangeText={handleChange("message")}
                                    label="Custom Message"
                                    multiline
                                    numberOfLines={10}
                                    onBlur={() => setFieldTouched("message")}
                                    textAlignVertical="top"
                                    caption={
                                        touched.message && errors.message
                                            ? errors.message
                                            : undefined
                                    }
                                    placeholder="Say something nice, or not ..."
                                    status={
                                        touched.message && errors.message ? "danger" : "basic"
                                    }
                                />

                                <Button
                                    style={styles.sendMessageButton}
                                    onPress={() => handleSubmit()}
                                >
                                    Send Message
                                </Button>
                            </>
                        )}
                    </Formik>
                </Row>
            </Screen>
        </KeyboardAwareScrollView>
    )
}

export default MessagePropertyScreen
const styles = StyleSheet.create({
    container: {
        marginHorizontal: LISTMARGIN,
    },
    row: { alignItems: "center", paddingVertical: 10, flexDirection: 'column' },
    address: { marginLeft: 10 },
    image: { height: 50, width: 70 },
    input: {
        marginTop: 10,
    },
    sendMessageButton: { marginTop: 20 },
});