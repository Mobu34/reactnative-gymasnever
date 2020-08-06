// Components/WelcomeComponent.js

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

class WelcomeComponent extends React.Component {

  render() {
    return (
      <View style={styles.main_container}>
        <Text style={[styles.texts, styles.first]}>Welcome to GymAsNever</Text>
        <Text style={styles.texts}>The application that has been created for those who love to train in a GYM but never have any idea about a good program.</Text>
        <Text style={styles.texts}>With this app, you just need to set up the level you estimate is yours and your goal and then it's MAGIC</Text>
        <Text style={styles.texts}>We create program for you, according to what muscle(s) you wanna train and how many times you have for a training.</Text>
        <Text style={styles.texts}>If you are ready to train like you never do, go ahead and ENJOY!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: 'rgba(204, 102, 0, 0.9)',
    alignItems: 'center',
    height: 350,
    width: 350,
    justifyContent: 'space-around',
    borderRadius: 100,

  },
  texts: {
    textAlign: 'center'
  },
  first: {
    fontSize: 20
  }
})

export default WelcomeComponent
