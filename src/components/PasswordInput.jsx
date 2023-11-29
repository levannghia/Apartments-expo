import React, { useState } from 'react'
import { Input } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextStyle, TouchableOpacity, StyleSheet } from "react-native";
import { EvaStatus } from "@ui-kitten/components/devsupport/typings";

const PasswordInput = ({
    value,
    style,
    onChangeText,
    placeholder = "Your Password",
    label = "password",
    onBlur,
    caption,
    status,
}) => {
    const [passwordHidden, setPasswordHidden] = useState(true);

    const getEyeIcon = () => {
        if (passwordHidden)
            return (
                <MaterialCommunityIcons
                    size={24}
                    name="eye-off-outline"
                    color="black"
                />
            );

        return (
            <MaterialCommunityIcons size={24} name="eye-outline" color="black" />
        );
    };

    return (
        <Input
            style={style}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            autoComplete="password"
            autoCapitalize="none"
            autoCorrect={false}
            label={label}
            secureTextEntry={passwordHidden}
            textContentType="password"
            onBlur={onBlur}
            caption={caption}
            status={status}
            accessoryRight={() => (
                <TouchableOpacity
                    style={styles.eyeContainer}
                    onPress={() => setPasswordHidden(!passwordHidden)}
                >
                    {getEyeIcon()}
                </TouchableOpacity>
            )}
        />
    )
}

export default PasswordInput

const styles = StyleSheet.create({ eyeContainer: { paddingHorizontal: 10 } });