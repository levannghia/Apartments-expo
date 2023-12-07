import * as WebBrowser from "expo-web-browser";

export const openURL = async (url) => {
  try {
    let prefix = '';
    if(url.includes("https://")) prefix = "https://";
    if(url.includes("www.")) prefix += "www.";
    await WebBrowser.openBrowserAsync(prefix + url);
  } catch (error) {
    alert("Unable to view website");
  }
};