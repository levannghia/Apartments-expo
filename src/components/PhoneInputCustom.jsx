import { StyleSheet, View } from 'react-native'
import React, { useState, useRef, Ref } from "react"
import { Text } from '@ui-kitten/components'
import PhoneInput from "react-native-phone-number-input";
import { default as theme } from '../../theme.json';

const PhoneInputCustom = ({
    onChangeText,
    phoneNumber,
    phoneRef,
    countryCode,
    error,
    style,
    onBlur,
}) => {
    const [borderColor, setBorderColor] = useState(theme['light-color-gray']);

    if (!phoneRef) phoneRef = useRef(null);

    return (
        <View style={style}>
            <Text appearance={'hint'} category={"c1"} style={styles.label}>Phone</Text>
            <PhoneInput
                ref={phoneRef}
                onChangeText={onChangeText}
                value={phoneNumber}
                defaultCode={countryCode ? countryCode : "US"}
                containerStyle={[
                    {
                        borderColor: error ? theme["color-danger-500"] : borderColor,
                    },
                    styles.containerStyle,
                    styles.input,
                ]}
                textInputProps={{
                    selectionColor: theme["color-success-300"],
                    dataDetectorTypes: "phoneNumber",
                    onFocus(e) {
                        setBorderColor(theme["color-primary-500"]);
                    },
                    onBlur(e) {
                        if (onBlur) onBlur();
                        setBorderColor(theme["color-light-gray"]);
                        if (
                            !phoneRef .current?.isValidNumber(phoneNumber) &&
                            phoneNumber !== ""
                        ) {
                            setBorderColor(theme["color-danger-500"]);
                        }
                    },
                    style: styles.textInputStyle,
                }}
                layout="second"
                textContainerStyle={styles.textContainer}
            />

            {
                borderColor === theme["color-danger-500"] || error ? (
                    <Text category="c1" style={styles.errorText}>
                        {error ? error : "Invalid Phone Number"}
                    </Text>
                ) : null
            }
        </View>

    )
}

export default PhoneInputCustom

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
    },
    label: { fontWeight: "bold", marginBottom: -5 },
    containerStyle: {
        width: "100%",
        borderRadius: 5,
        borderWidth: 1,
        height: 40,
        marginTop: 0,
        backgroundColor: "#f7f9fc",
    },
    textInputStyle: {
        width: "100%",
        height: 40,
        fontSize: 15,
    },
    textContainer: {
        borderRadius: 5,
    },
    errorText: { color: theme['color-danger-500'] },
})