import * as WebBrowser from "expo-web-browser";

export const openURL = async (url) => {
  try {
    await WebBrowser.openBrowserAsync(url);
  } catch (error) {
    alert("Unable to view website");
  }
};