import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerToggleButton } from '@react-navigation/drawer'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const HomeHeader = () => {
  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.drawer}>
      <DrawerToggleButton tintColor="#fff" />
    </TouchableOpacity>
     <View style={styles.header}>
      <Ionicons name='search' size={24} color='#fff' style={styles.icon}/>
      <Image source={require('../assets/images/avatar.png')} width={20} height={20}/>
     </View>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  container: {
   padding:20,
   flexDirection:"row",
   justifyContent:"space-between",
   backgroundColor: '#000',
  },
  header:{
    flexDirection:"row",
    gap:6,
    alignItems:"center"
  },
  icon:{
    backgroundColor:"#23251F",
    padding:7,
    borderRadius:50
  },
  drawer:{
    backgroundColor:"#23251F",
    borderRadius: 8,
  }
})