import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Input, Box } from 'native-base'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

export const DatePicker = (props) => {

    const [dobEditMode, setDobEditMode] = useState('false')
    const [dob, setDob] = useState(props.date)  

    useEffect(() => {
        props.setFieldValue('date', dob) 
    }, [dob])

    return (
        <Box>
            <TouchableOpacity
                onPress={() => { setDobEditMode('true') }}
            >
                <Input
                    value={moment(dob).format('DD-MM-YYYY')}
                    isReadOnly                    
                />
            </TouchableOpacity>
            {
                dobEditMode !== 'false' && <RNDateTimePicker
                    testID="dateTimePicker"
                    mode="date"
                    display="default"
                    value={new Date(dob)}
                    display="spinner"
                    onChange={(e, selectedDate) => {                                         
                        setDobEditMode('false')
                        setDob((prevDate) => {                            
                            if(selectedDate){
                                return selectedDate
                            }else{
                                return prevDate
                            }
                        })   
                                               
                    }}
                />

            }
        </Box>
    )
}