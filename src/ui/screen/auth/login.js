
import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {  Relogin } from '../../../stateManage/auth/actions';
import {useSelector, useDispatch} from 'react-redux';

const Login = () => {
    const dispatch = useDispatch()
    const fetchLoginData = () => dispatch(Relogin({ 'login_email': username, 'password': password }));

    const {loginData} = useSelector(state => state.loginReducer);
    console.log("==>",loginData)
    const [username, setUsername] = useState('customer@wms.com');
    const [password, setPassword] = useState('Admin123@');
    const [loading, setLoading] = useState(false);


    const authentication = async () => {
        setLoading(true)
        fetchLoginData();
        // const data = await Relogin({ 'login_email': username, 'password': password })
        setLoading(false)
        // console.log(data)
    }


    try {
        return (
            <View>
                <TextInput
                    placeholder='Enter username'
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                {
                    !loading &&

                    <TextInput
                        placeholder='Enter password'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                }
                <TouchableOpacity onPress={() => authentication()} >
                    <Text>
                        submit
                    </Text>
                </TouchableOpacity>
            </View>
        )
    } catch {

    }
}

export default Login

const styles = StyleSheet.create({})