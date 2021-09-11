import React, { useState, useEffect } from 'react'
import { NativeBaseProvider, VStack, Center, FormControl, Text, Input, Button, Avatar, Radio, HStack } from 'native-base'
import { Formik } from 'formik'
import axios from 'axios'
import { DatePicker } from '../components/datePicker'
import moment from 'moment'


const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = 'Required';
    }

    return errors;
}

export const Profile = () => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        axios
            .get('https://randomuser.me/api/?inc=dob,gender,name,picture')
            .then(
                res => {
                    const userData = res.data.results.reduce((a, b) => Object.assign(a, b), {})
                    setUser(userData)
                }
            )
    }, [])

    if (!user) {
        return (
            <NativeBaseProvider>
                <Center flex={1}>
                    <Text>loading...</Text>
                </Center>
            </NativeBaseProvider>
        )
    }
    
    const onSubmit = (data) => {
        alert(data.firstName + ' ' + data.lastName + ' ' + data.gender + ' ' + moment(data.date).format('DD-MM-YYYY') + ' profile saved!')
    }

    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Formik initialValues={{ firstName: user.name.first, lastName: user.name.last, date: user.dob.date, gender: user.gender }} onSubmit={onSubmit} validate={validate}>
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors }) => (
                        <VStack width="80%" space={4}>
                            <Center>
                                <Avatar
                                    size='2xl'
                                    source={{
                                        uri: user.picture.large
                                    }}
                                >
                                </Avatar>
                            </Center>

                            <FormControl isRequired isInvalid={'firstName' in errors}>
                                <FormControl.Label>First Name</FormControl.Label>
                                <Input
                                    onBlur={handleBlur('firstName')}
                                    onChangeText={handleChange('firstName')}
                                    value={values.firstName}
                                />
                                <FormControl.ErrorMessage>
                                    {errors.firstName}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={'lastName' in errors}>
                                <FormControl.Label>Last Name</FormControl.Label>
                                <Input
                                    onBlur={handleBlur('lastName')}
                                    onChangeText={handleChange('lastName')}
                                    value={values.lastName}
                                />
                                <FormControl.ErrorMessage>
                                    {errors.lastName}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={'date' in errors}>
                                <FormControl.Label>Date of birth</FormControl.Label>
                                <DatePicker date={values.date} setFieldValue={setFieldValue} />
                                <FormControl.ErrorMessage>
                                    {errors.date}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <Radio.Group
                                name="myRadioGroup"
                                defaultValue={values.gender}
                                onChange={handleChange('gender')}
                            >
                                <HStack space={3} alignItems="center">
                                    <Radio value="male" my={1}>
                                        male
                                    </Radio>
                                    <Radio value="female" my={1}>
                                        female
                                    </Radio>
                                </HStack>
                            </Radio.Group>

                            <Button onPress={handleSubmit} colorScheme="teal">
                                Save profile
                            </Button>
                        </VStack>
                    )}
                </Formik>
            </Center>
        </NativeBaseProvider >
    )
}