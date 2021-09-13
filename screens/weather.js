import React, { useState, useEffect } from 'react'
import { NativeBaseProvider, VStack, Center, FormControl, Text, Input, Button, Avatar, Radio, HStack } from 'native-base'

export const Weather = () => {
    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Text>weather</Text>
            </Center>
        </NativeBaseProvider>
    )
}