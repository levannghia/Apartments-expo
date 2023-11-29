import { Platform, StyleSheet } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";

export const AppleButton = ({
  type,
  onPress,
}) => {
  if (Platform.OS !== "ios") return null;
  if (!AppleAuthentication.isAvailableAsync()) return null;

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={
        type === "sign-in"
          ? AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
          : AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP
      }
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
      cornerRadius={5}
      style={styles.button}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
  },
});