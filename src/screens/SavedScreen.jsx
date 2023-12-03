import React, {useState, useContext} from 'react'
import { Screen } from '../components/screen'
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import LottieView from "lottie-react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import  Row  from "../components/Row";
import { default as theme } from '../../theme.json';
import { properties } from "../data/properties";
import Card  from "../components/Card";
import SignUpAndSignInButtons from '../components/SignUpAndSignInButtons';
import { LISTMARGIN } from '../../constant';
import { AuthContext } from '../../context';

const SavedScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {user} = useContext(AuthContext)
  const navigation = useNavigation();
  const savedProperties = undefined;
  
  const getButtonAppearance = (buttonIndex) => {
    if (activeIndex === buttonIndex) return "filled";
    return "ghost";
  };


  const handleButtonPress = (index) => {
    setActiveIndex(index);
  };

  const getBodyText = (heading, subHeading) => {
    return (
      <View style={styles.textContainer}>
        <Text category={"h6"} style={styles.text}>
          {heading}
        </Text>
        <Text appearance={"hint"} style={[styles.text, styles.subHeading]}>
          {subHeading}
        </Text>
      </View>
    );
  };

  const getPropertiesFlatList = (properties) => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={properties}
        contentContainerStyle={{ marginTop: 10 }}
        renderItem={({ item }) => (
          <Card
            property={item}
            style={styles.card}
            // onPress={() =>
            //   navigation.navigate("PropertyDetails", { propertyID: item.ID })
            // }
          />
        )}
        keyExtractor={(item) => item.ID}
      />
    );
  };

  const getBody = () => {
    if (activeIndex === 0) {
      // if (savedProperties?.data && savedProperties.data.length > 0)
      //   return getPropertiesFlatList(savedProperties.data);
      return (
        <>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require("../assets/lotties/Favorites.json")}
          />
          {getBodyText(
            "You do not have any favorites saved",
            "Tap the heart icon on rentals to add favorites"
          )}
          {!user && (
            <SignUpAndSignInButtons
              style={styles.signInAndSignUpButtonContainer}
            />
          )}
        </>
      );
    }
    if (activeIndex === 1) {
      // if (contactedProperties?.data && contactedProperties.data.length > 0)
      //   return getPropertiesFlatList(contactedProperties.data);
      return (
        <>
          <LottieView
            autoPlay
            style={styles.lottie}
            source={require("../assets/lotties/Contacted.json")}
          />
          {getBodyText(
            "You have not contacted any properties yet",
            "Your contacted properties will show here"
          )}
          {!user && (
            <SignUpAndSignInButtons
              style={styles.signInAndSignUpButtonContainer}
            />
          )}
        </>
      );
    }
    // if (applicationProperties)
    //   return getPropertiesFlatList(applicationProperties);
    return (
      <>
        <LottieView
          autoPlay
          style={styles.lottie}
          source={require("../assets/lotties/Applications.json")}
        />
        {getBodyText(
          "Check the status of your rental applications here",
          "Any properties that you have applied to will show here"
        )}
        {!user && (
          <SignUpAndSignInButtons
            style={styles.signInAndSignUpButtonContainer}
          />
        )}
      </>
    );
  };

  return (
    <Screen>
      <Row style={styles.buttonContainer}>
        <Button
         style={[styles.button, styles.favoritesButton]}
         size={"small"}
         appearance={getButtonAppearance(0)}
         onPress={() => handleButtonPress(0)}
        >
          Favorites
        </Button>
        <Button
         style={[styles.button, styles.contactedButton]}
         size={"small"}
         appearance={getButtonAppearance(1)}
         onPress={() => handleButtonPress(1)}
        >
          Contacted
        </Button>
        <Button
         style={[styles.button, styles.applicationButton]}
         size={"small"}
         appearance={getButtonAppearance(2)}
         onPress={() => handleButtonPress(2)}
        >
          Applications
        </Button>
      </Row>
      <View style={styles.container}>{getBody()}</View>
    </Screen>
  )
}

export default SavedScreen

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    borderRadius: 5,
  },
  button: {
    width: "33.3%",
    borderRadius: 0,
    borderColor: theme["color-primary-500"],
  },
  applicationButton: { borderTopRightRadius: 5, borderBottomRightRadius: 5 },
  favoritesButton: { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 },
  contactedButton: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  container: { flex: 1, justifyContent: "center", marginHorizontal: LISTMARGIN },
  lottie: {
    height: 180,
    width: 180,
    marginBottom: 20,
    alignSelf: 'center',
  },
  text: {
    textAlign: "center",
  },
  subHeading: {
    marginTop: 10,
  },
  textContainer: {
    marginVertical: 15,
  },
  signInAndSignUpButtonContainer: {
    marginTop: 15,
  },
  card: { marginVertical: 10 },
})