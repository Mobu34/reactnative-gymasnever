// Screens/ChestScreen.js

import React from 'react'
import { StyleSheet, View, Text, Button, Platform, TouchableOpacity, Image } from 'react-native'
import { DrawerActions } from 'react-navigation-drawer'
import AllExercises from '../Components/AllExercises'
import { requestAllExercises } from '../Data/DataFromServer'

class ChestScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      exercises: undefined
    }
  }

  static navigationOptions = ({ navigation }) => {
    if (Platform.OS === 'ios') {
      return {
        headerLeft: <TouchableOpacity
                      style={styles.drawer_icon}
                      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    >
                      <Image
                        style={styles.icon}
                        source={require('../Images/ic_drawer.png')}/>
                    </TouchableOpacity>
      }
    }
  }

  _getAllExercises() {
    const { exercises } = this.state
    if (exercises === undefined) {
      requestAllExercises(2).then(data => {
        this.setState({
          exercises: data
        })
      })
    }
  }

  render() {
    const { exercises } = this.state
    return (
      <View style={styles.main_container}>
      {this._getAllExercises()}
        <AllExercises nav={this.props.navigation} data={exercises} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  drawer_icon: {
    marginLeft: 15
  },
  icon: {
    width: 30,
    height: 30
  }
})

export default ChestScreen
