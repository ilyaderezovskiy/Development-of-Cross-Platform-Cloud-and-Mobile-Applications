import React from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Main from "./components/Main"
import Login from "./components/Login";
import Character from "./components/Character";
import ListOfCharacters from "./components/ListOfCharacters";

const Stack = createStackNavigator();

function Navigate() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={ { headerShown : false }} />
                <Stack.Screen name="Main" component={Main} options={ { headerShown : false }} />
                <Stack.Screen name="Character" component={Character} />
                <Stack.Screen
                    name="ListOfCharacters"
                    component={ListOfCharacters}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigate;