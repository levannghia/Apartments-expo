import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { default as theme } from '../../theme.json';
import { Button } from '@ui-kitten/components';
import { useNavigation } from "@react-navigation/native";

const SignUpAndSignInButtons = ({ style }) => {
    const navigation = useNavigation();

    return (
      <View style={style}>
        <Button
        //  onPress={() => navigation.navigate("SignIn")}
        >Sign In</Button>
        <Button
          appearance={"ghost"}
          style={styles.signUpButton}
        //   onPress={() => navigation.navigate("SignUp")}
        >
          Create Account
        </Button>
      </View>
    );
}

export default SignUpAndSignInButtons

const styles = StyleSheet.create({
    signUpButton: {
        marginVertical: 10,
        borderColor: theme["color-primary-500"],
    },
})