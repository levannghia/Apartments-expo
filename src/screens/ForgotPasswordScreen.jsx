import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from 'react'
import { Input, Button, Text } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { Screen } from '../components/screen'
import ModalHeader from "../components/ModalHeader";
import { LISTMARGIN } from '../../constant';

const ForgotPasswordScreen = () => {
  const [emailSent, setEmailSent] = useState(false);
  const handleSubmit = () => {
    setEmailSent(true)
  }
  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen style={styles.container}>
        <ModalHeader text="JPApartments" xShown={true} />
        {emailSent ? (
          <>
            <Text category={"h5"} style={styles.header}>
              Email Sent!
            </Text>
            <Text>
              An email containing instructions about how to change your password
              has been sent to you. Please check your junk mail or spam section
              if you do not see an email.
            </Text>
          </>
        ) : (
          <>
            <Text category={"h5"} style={styles.header}>
              Forgot your password?
            </Text>
            <Text>
              Please enter your email, and we'll send you a link to change your
              password.
            </Text>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={yup.object().shape({
                email: yup.string().email().required("Your email is required."),
              })}
              onSubmit={handleSubmit}
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
              }) => {
                return (
                  <>
                    <Input
                      style={styles.input}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      placeholder="Your Email Address"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      label="Email"
                      onBlur={() => setFieldTouched("email")}
                      caption={
                        touched.email && errors.email ? errors.email : undefined
                      }
                      status={
                        touched.email && errors.email ? "danger" : "basic"
                      }
                    />

                    <Button
                      style={styles.button}
                      onPress={() => handleSubmit()}
                    >
                      Continue
                    </Button>
                  </>
                );
              }}
            </Formik>
          </>
        )}
      </Screen>
    </KeyboardAwareScrollView>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  container: { marginHorizontal: 10 },
  header: { textAlign: "center", marginVertical: 20 },
  button: { marginTop: 20 },
  input: {
    marginTop: 10,
  },

})