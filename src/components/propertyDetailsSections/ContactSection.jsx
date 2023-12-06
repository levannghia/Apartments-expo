import { StyleSheet, View, TouchableOpacity, Share } from 'react-native'
import { Text, Button } from "@ui-kitten/components";
import React from 'react'
import { default as theme } from '../../../theme.json';
import Row from '../Row';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const formatPhoneNumber = (str, callingCode) => {
    let cleaned = ("" + str).replace(/\D/g, "");
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return [
            `+${callingCode} `,
            "(",
            match[2],
            ") ",
            match[3],
            "-",
            match[4],
        ].join("");
    }
    return "Give Us A Call";
};

const ContactSection = ({ property }) => {
    const navigation = useNavigation();

    return (
        <>
      <Text category={"h5"} style={styles.defaultMarginVertical}>
        Contact
      </Text>
      <TouchableOpacity>
        <Row style={styles.row}>
          <MaterialIcons
            name="smartphone"
            color={theme["color-info-500"]}
            size={16}
          />

          <Text category={"c1"} status={"info"} style={styles.rowText}>
            {formatPhoneNumber(property.phoneNumber, property.callingCode)}
          </Text>
        </Row>
      </TouchableOpacity>
      {property?.website ? (
        <TouchableOpacity
        //   onPress={() =>
        //     // can also use Linking.openURL but that takes you out of the app
        //     {
        //       if (property.website) openURL(property.website);
        //     }
        //   }
        >
          <Row style={styles.row}>
            <MaterialCommunityIcons
              name="web"
              color={theme["color-info-500"]}
              size={16}
            />
            <Text category={"c1"} status={"info"} style={styles.rowText}>
              View Property Website
            </Text>
          </Row>
        </TouchableOpacity>
      ) : null}
      <Row style={styles.buttonRow}>
        <Button
          style={styles.button}
          appearance={"ghost"}
          onPress={() => {
            navigation.navigate("MessageProperty", {
              propertyID: property.ID,
              tour: true,
            });
          }}
        >
          Tour
        </Button>
        <Button
          style={styles.button}
          appearance={"ghost"}
          onPress={() => {
            navigation.navigate("MessageProperty", {
              propertyID: property.ID,
            });
          }}
        >
          Message
        </Button>
      </Row>
    </>
    )
}

export default ContactSection

const styles = StyleSheet.create({
    defaultMarginVertical: { marginVertical: 10 },
    row: { alignItems: "center", paddingVertical: 5 },
    rowText: { marginLeft: 10 },
    buttonRow: { justifyContent: "space-between", paddingVertical: 10 },
    button: {
        borderColor: theme["color-primary-500"],
        borderWidth: 1,
        width: "45%",
    },
});