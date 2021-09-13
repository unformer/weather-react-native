import React from 'react'
import { Profile } from '../screens/profile'
import { Weather } from '../screens/weather'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const BottomTabs = createMaterialBottomTabNavigator()

const menuIconActive = "#fff"
const menuIconInactive = "rgba(255,255,255,0.4)"

export const BottomNavBar = () => {
    return (
        <NavigationContainer>
            <BottomTabs.Navigator>
                <BottomTabs.Screen
                    name="Weather"
                    component={Weather}
                    options={{
                        tabBarLabel: 'Weather',
                        tabBarIcon: ({ focused }) => (
                            <MaterialCommunityIcons name="home" color={focused ? menuIconActive : menuIconInactive} size={24} />
                        ),
                    }}
                />
                <BottomTabs.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ focused }) => (
                            <MaterialCommunityIcons name="account" color={focused ? menuIconActive : menuIconInactive} size={24} />
                        ),
                    }} />
            </BottomTabs.Navigator>
        </NavigationContainer>
    )
}