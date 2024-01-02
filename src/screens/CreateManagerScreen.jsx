import { View, StyleSheet, Image, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState, useRef } from 'react';
import { Text, Input, Button } from "@ui-kitten/components";
import { Formik } from "formik";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Screen } from "../components/screen";
import ModalHeader from "../components/ModalHeader";
import { LISTMARGIN } from "../../constant";
import PhoneInputCustom from "../components/PhoneInputCustom";

const CreateManagerScreen = () => {
    const [imageURI, setImageURI] = useState('');
    const phoneRef = useRef();

    const pickImage = async (setBase64Image, field) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            // aspect: [4, 3],
            // quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setBase64Image(field, result.base64);
            setImageURI(result.uri)
        }
    }
    return (
        <KeyboardAwareScrollView bounces={false}>
            <Screen>
                <ModalHeader text={"JPApartments"} xShown={true} />
                <View style={styles.container}>
                    <Text style={styles.header} category={"h5"}>Create Property Manager Account</Text>
                    <Text>
                        Create this account to list your properties. Users will see this
                        information under the contact section of your listings.
                    </Text>
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            phoneNumber: "",
                            website: "",
                            image: "",
                        }}
                        validationSchema={yup.object().shape({
                            name: yup.string().required("Required"),
                            email: yup.string().email().required("Required"),
                            phoneNumber: yup.string(),
                            website: yup.string()
                        })}

                        onSubmit={(values) => { }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                            setFieldTouched,
                            setFieldValue,
                        }) => (
                            <>
                                <Input
                                    style={styles.input}
                                    value={values.name}
                                    onChangeText={handleChange("name")}
                                    placeholder="Management Name"
                                    autoCapitalize="none"
                                    label="Name *"
                                    onBlur={() => setFieldTouched("name")}
                                    caption={
                                        touched.name && errors.name ? errors.name : undefined
                                    }
                                    status={touched.name && errors.name ? "danger" : "basic"}
                                />
                                <Input
                                    style={styles.input}
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    placeholder="Email Address"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    autoComplete="email"
                                    label="Email *"
                                    textContentType="emailAddress"
                                    onBlur={() => setFieldTouched("email")}
                                    caption={
                                        touched.email && errors.email ? errors.email : undefined
                                    }
                                    status={touched.email && errors.email ? "danger" : "basic"}
                                />
                                <Input
                                    style={styles.input}
                                    value={values.website}
                                    onChangeText={handleChange("website")}
                                    placeholder="Your Website"
                                    autoCapitalize="none"
                                    keyboardType="url"
                                    label="Website"
                                    textContentType="URL"
                                    onBlur={() => setFieldTouched("website")}
                                    caption={
                                        touched.website && errors.website
                                            ? errors.website
                                            : undefined
                                    }
                                    status={
                                        touched.website && errors.website ? "danger" : "basic"
                                    }
                                />
                                <PhoneInputCustom
                                    onChangeText={handleChange("phoneNumber")}
                                    phoneNumber={values.phoneNumber}
                                    style={styles.input}
                                    phoneRef={phoneRef}
                                />

                                {imageURI ? (
                                    <Pressable
                                        style={styles.imageContainer}
                                        onPress={() => pickImage(setFieldValue, "image")}
                                    >
                                        <Image source={{ uri: imageURI }} style={styles.image} />
                                        <Button
                                            status={"info"}
                                            appearance={"ghost"}
                                            onPress={() => {
                                                setImageURI("");
                                                setFieldValue("image", "");
                                            }}
                                        >
                                            Clear Image
                                        </Button>
                                    </Pressable>
                                ) : null}
                                <Button
                                    appearance={"ghost"}
                                    style={styles.signInButton}
                                    onPress={() => pickImage(setFieldValue, "image")}
                                >
                                    {imageURI ? "Update Image" : "Add Image"}
                                </Button>
                                <Button
                                    style={styles.signInButton}
                                    onPress={() => handleSubmit()}
                                >
                                    Create Account
                                </Button>
                            </>
                        )}
                    </Formik>
                </View>
            </Screen>
        </KeyboardAwareScrollView>
    )
}

export default CreateManagerScreen

const styles = StyleSheet.create({
    container: {
        marginHorizontal: LISTMARGIN
    },
    header: { textAlign: "center", marginVertical: 20 },
    input: {
        marginTop: 10,
    },
    signInButton: { marginTop: 20 },
    imageContainer: {
        paddingVertical: 10,
    },
    image: {
        height: 200,
        width: 200,
        resizeMode: "contain",
        borderRadius: 5,
        alignSelf: "center",
    },
})