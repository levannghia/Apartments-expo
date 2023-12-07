import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    AccountScreen,
    SearchScreen,
    SavedScreen,
    NotFoundScreen,
    ModalScreen,
    SignInScreen,
    SignUpScreen,
    ForgotPasswordScreen,
    ResetPasswordScreen,
    FindLocationScreen,
    SignUpOrSignInScreen,
    PropertyDetailsScreen,
    MessagePropertyScreen,
    MessageScreen,
} from '../screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { default as theme } from '../../theme.json';

export function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
                <Stack.Screen name="FindLocation" component={FindLocationScreen} options={{headerShown: false}} />
                <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown: false}}/>
                <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SignUpOrSignIn" component={SignUpOrSignInScreen} options={{headerShown: false}}/>
                <Stack.Screen name="PropertyDetail" component={PropertyDetailsScreen} options={{headerShown: false}}/>
                <Stack.Screen name="MessageProperty" component={MessagePropertyScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Message" component={MessageScreen} options={{headerShown: false}}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <Tab.Navigator initialRouteName='Search' screenOptions={{
            tabBarActiveTintColor: theme['color-primary-500'],
            headerShown: false,
        }}>
            <Tab.Screen name="Saved" component={SavedScreen} options={{
                title: 'Saved',
                tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="heart-outline" size={24} color={color} />)
            }} />
            <Tab.Screen name="Account" component={AccountScreen} options={{
                title: 'Account',
                tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account-circle-outline" size={24} color={color} />)
            }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{
                title: 'Search',
                tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="magnify" size={24} color={color} />)
            }} />
        </Tab.Navigator>
    );
}