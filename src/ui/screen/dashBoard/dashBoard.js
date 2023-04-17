import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ErrorHandle from '../../ErrorHandling/error'
import Background from '../../helper/background'
import DrawerHeader from '../../component/header'

const Dashboard = () => {
try {
    return (
        <Background>
          <DrawerHeader />

        
        </Background>
      )
} catch (error) {
    <ErrorHandle error_message={error} />
    
}
}

export default Dashboard

const styles = StyleSheet.create({})