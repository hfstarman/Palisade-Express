import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function RouteCard({ time, busNumber }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{time}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{busNumber}</Text>
      </View>
    </View>
  )
}

export default RouteCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    // borderColor: 'white',
    // borderWidth: 1,
  },
  textContainer: {
    width: 150,
    alignItems: 'center',
    // borderColor: 'green',
    // borderWidth: 1,
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
})
