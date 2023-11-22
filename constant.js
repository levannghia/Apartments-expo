import { Dimensions, StatusBar } from 'react-native'
const { width, height } = Dimensions.get('window')

export const LISTMARGIN = 8;
export const WIDTH = width - LISTMARGIN * 2; 
const baseHeight = 160;
const iosNotch = 40;
const iosHeight = baseHeight + iosNotch;
let androidHeight = baseHeight;
let androidNotch = 0;
if (StatusBar.currentHeight) androidNotch = StatusBar.currentHeight;
androidHeight += androidNotch;

export const HEADERHEIGHT = Platform.OS === "ios" ? iosHeight : androidHeight;

const serverUrl = "http://testlrv.praz.vn/api";
const location = '/location';

const locationEndpoint = serverUrl + location;

export const endpoints = {
    autoCompeleteEndpoint: locationEndpoint + "/autocomplete",
    searchEndpoint: locationEndpoint + "/search"
}