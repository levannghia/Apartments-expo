import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Screen } from '../components/screen'
import { Text, Input, Button } from "@ui-kitten/components";
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as yup from "yup";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ModalHeader from "../components/ModalHeader";
import GoogleButton from "../components/GoogleButton";
import FacebookButton from "../components/FacebookButton";
import { AppleButton } from "../components/AppleButton";
import OrDivider from "../components/OrDivider";
import PasswordInput from "../components/PasswordInput";
import { useMutation } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { registerUser } from '../services/auth';
import Loading from '../components/Loading';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const {login} = useAuth();
  const [__, ___, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: "341067331979268",
  })

  const facebookRegister = useMutation(
    async () => {
      const response = await fbPromptAsync();
      if(response.type === 'success'){
        const {access_token} = response.params
        console.log(access_token);
      }
    }
  )

  const nativeRegister = useMutation(
    async (values) => {
      const user = await registerUser(values.fullName, values.email, values.password);

      if(user) {
        login(user);
        navigation.goBack()
      }
    }
  )

  if(nativeRegister.isLoading) return <Loading/>;
  
  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen>
        <ModalHeader text="JPApartments" xShown />
        <View style={styles.container}>
          <Text category={"h5"} style={styles.header}>
            Sign Up
          </Text>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
            }}
            validationSchema={yup.object().shape({
              fullName: yup.string().required("Your last name is required."),
              email: yup.string().email().required("Your email is required."),
              password: yup
                .string()
                .required("A password is required.")
                .matches(
                  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/,
                  "Your password must have 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character."
                ),
            })}
            onSubmit={async (values) => {
              nativeRegister.mutate(values)
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
            }) => {
              return (
                <>
                  <Input
                    style={styles.input}
                    value={values.firstName}
                    onChangeText={handleChange("fullName")}
                    placeholder="Your Full Name"
                    label="Full Name"
                    autoComplete="name"
                    textContentType="givenName"
                    onBlur={() => setFieldTouched("fullName")}
                    caption={
                      touched.fullName && errors.fullName
                        ? errors.fullName
                        : undefined
                    }
                    status={
                      touched.fullName && errors.fullName ? "danger" : "basic"
                    }
                  />
                  {/* <Input
                    style={styles.input}
                    value={values.lastName}
                    onChangeText={handleChange("lastName")}
                    placeholder="Your Last Name"
                    label="Last Name"
                    textContentType="familyName"
                    autoComplete="name"
                    onBlur={() => setFieldTouched("lastName")}
                    caption={
                      touched.lastName && errors.lastName
                        ? errors.lastName
                        : undefined
                    }
                    status={
                      touched.lastName && errors.lastName ? "danger" : "basic"
                    }
                  /> */}
                  <Input
                    style={styles.input}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    placeholder="Your Email Address"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoComplete="email"
                    autoCorrect={false}
                    label="Email"
                    onBlur={() => setFieldTouched("email")}
                    caption={
                      touched.email && errors.email ? errors.email : undefined
                    }
                    status={touched.email && errors.email ? "danger" : "basic"}
                  />
                  <PasswordInput
                    style={styles.input}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    placeholder="Your Password"
                    label="Password"
                    onBlur={() => setFieldTouched("password")}
                    caption={
                      touched.password && errors.password
                        ? errors.password
                        : undefined
                    }
                    status={
                      touched.password && errors.password ? "danger" : "basic"
                    }
                  />

                  <Button
                    style={styles.signUpButton}
                    onPress={() => handleSubmit()}
                  >
                    Sign Up
                  </Button>

                  <OrDivider style={styles.orContainer} />

                  <GoogleButton
                    text="Sign up with Google"
                    style={styles.button}
                    // onPress={async () => await googleAuth()}
                  />
                  <FacebookButton
                    text="Sign up with Facebook"
                    style={styles.button}
                    onPress={async () => facebookRegister.mutate()}
                  />
                  <AppleButton
                    type="sign-up"
                    // onPress={async () => await appleAuth()}
                  />
                </>
              );
            }}
          </Formik>
        </View>
      </Screen>
    </KeyboardAwareScrollView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: { marginHorizontal: 10 },
  header: { textAlign: "center", marginVertical: 20 },
  input: {
    marginTop: 10,
  },
  forgotPasswordContainer: { alignItems: "flex-end", marginTop: 5 },
  signUpButton: { marginTop: 20 },
  orContainer: {
    marginVertical: 30,
  },
  button: { marginBottom: 10 },
})