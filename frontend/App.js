import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  Platform,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import RouteCard from './components/RouteCard'

const App = () => {
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  const [routeDate, setRouteData] = useState([])
  const [loading, setLoading] = useState(false)

  //create a time picker that defaults to current time
  //create a date picker that defaults to current date
  //create a button that lets me submit the request

  //create onsubmit function that does the fetch and stores it into busTimes
  //have loading animation while fetching

  //create cards for each bus and bus time

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }

  const dateString = () => {
    // prettier-ignore
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr',+
      'May', 'June', 'July', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec',
    ]
    // prettier-ignore
    const dayNames = [
      'Mon', 'Tue', 'Wed', 'Thu',
      'Fri', 'Sat', 'Sun'
    ]

    const month = monthNames[date.getMonth()]
    const day = dayNames[date.getDay()]

    return `${day} ${month} ${date.getDate()}`
  }

  const timeString = () => {
    let hour = date.getHours()
    let antePost = 'AM'
    if (hour >= 12 && hour <= 23) antePost = 'PM'
    if (hour == 0) hour = 12
    if (hour > 12) hour -= 12

    return `${hour}:${date.getMinutes()} ${antePost}`
  }

  const handleSubmit = async () => {
    try {
      let response = await fetch('/buses')
      let jsonData = await response.json()
      console.log(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <View>
      <StatusBar backgroundColor={'#1A2B57'} />
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.title}>Palisade Express</Text>
        <View style={styles.pickerContainer}>
          <TouchableOpacity style={styles.pickerBtn} onPress={showDatepicker}>
            <Text style={{ ...styles.text, fontWeight: 'bold' }}>
              {'Select Date: '}
            </Text>
            <Text style={styles.text}>{dateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pickerBtn} onPress={showTimepicker}>
            <Text style={{ ...styles.text, fontWeight: 'bold' }}>
              {'Select Time: '}
            </Text>
            <Text style={styles.text}>{timeString()}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.submitContainer}>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Get Buses</Text>
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}
        <View style={styles.bottomContainer}>
          <View style={styles.routeHeaderContainer}>
            <View style={{ width: 150, alignItems: 'center' }}>
              <Text style={styles.routeHeader}>Time</Text>
            </View>
            <View style={{ width: 150, alignItems: 'center' }}>
              <Text style={styles.routeHeader}>Bus No.</Text>
            </View>
          </View>

          <View style={styles.routeInfoContainer}>
            <RouteCard time="12:34 PM" busNumber="999" />
            <RouteCard time="12:34 PM" busNumber="999" />
            <RouteCard time="12:34 PM" busNumber="999" />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#1A2B57',
    height: '100%',
    // borderWidth: 3,
    // borderColor: 'white',
  },
  title: {
    fontSize: 35,
    color: 'white',
    alignSelf: 'center',
    paddingVertical: 25,
    fontStyle: 'italic',
  },
  pickerContainer: {
    height: 140,
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'white',
  },
  pickerBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: '90%',
    height: 50,
    margin: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  submitContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'grey',
    // borderWidth: 1,
  },
  submitBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#49BD78',
    borderRadius: 5,
    width: '90%',
    height: 40,
  },
  submitText: {
    color: 'white',
    fontSize: 20,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '94%',
    alignSelf: 'center',
  },

  routeHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    width: '100%',
    alignSelf: 'center',
  },
  routeHeader: {
    color: '#ddd',
    fontSize: 25,
  },
  routeInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    // borderColor: 'plum',
    // borderWidth: 3,
  },
})
