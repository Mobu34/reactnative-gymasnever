// Screens/WelcomeScreen.js

import React from 'react'
import { StyleSheet, View, TouchableOpacity, Button, ImageBackground, Text, Animated, Dimensions } from 'react-native'
import LevelGoalComponent from '../Components/LevelGoalComponent'
import WelcomeComponent from '../Components/WelcomeComponent'
import AnimationWelcome from '../Animations/AnimationWelcome'
import AnimationLevelGoal from '../Animations/AnimationLevelGoal'

class WelcomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isGoButtonSelected: false,
      rightPosition: new Animated.Value(Dimensions.get('window').width),
      bottomPosition: new Animated.Value(0 - Dimensions.get('window').height),
      topPosition: new Animated.Value(Dimensions.get('window').height)
    }
  }

  _go() {
    const { isGoButtonSelected } = this.state
    if (isGoButtonSelected === false) {
      this.setState({
        isGoButtonSelected: true
      })
    }
    else {
      this.setState({
        isGoButtonSelected: false
      })
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.rightPosition,
      {
        toValue: 0,
        duration: 500
      }
    ).start()
  }

  componentDidUpdate() {
    const { isGoButtonSelected } = this.state
    if (isGoButtonSelected === false) {
      Animated.parallel([
        Animated.timing(
          this.state.topPosition,
          {
            toValue: 0 - Dimensions.get('window').height,
            duration: 1000
          }
        ).start(),
        Animated.timing(
          this.state.bottomPosition,
          {
            toValue: 0,
            duration: 1000
          }
        )
      ]).start()
    }
    else {
      Animated.parallel([
        Animated.timing(
          this.state.topPosition,
          {
            toValue: 0,
            duration: 1000
          }
        ).start(),
        Animated.timing(
          this.state.bottomPosition,
          {
            toValue: 0 - Dimensions.get('window').height,
            duration: 1000
          }
        )
      ]).start()
    }
  }

  _showWelcomeComponentOrLevelGoalComponent() {
    const { isGoButtonSelected } = this.state
    if (isGoButtonSelected === false) {
      return (
        <View style={styles.welcome_container}>
          <AnimationWelcome>
          <WelcomeComponent />
          <Button title="GO" color="black" onPress={() => this._go()}/>
          </AnimationWelcome>
        </View>
      )
    }
    else {
      return (
        <View style={styles.level_goal_container}>
          <Button title="GO" onPress={() => this._go()} />
          <AnimationLevelGoal>
            <LevelGoalComponent style={styles.level_goal} nav={this.props.navigation}/>
          </AnimationLevelGoal>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <ImageBackground
          source={require('../Images/3-méthodes-musculation.jpg')}
          style={styles.image_background}
        >
        <Animated.View
          style={[styles.welcome_container, {right: this.state.rightPosition, top: this.state.topPosition}]}
        >
          <WelcomeComponent />
        </Animated.View>
        <Animated.View

        >
          <Button title="GO" color="black" onPress={() => this._go()}/>
        </Animated.View>
        <Animated.View
          style={[styles.level_goal_container, {bottom: this.state.bottomPosition}]}
        >
          <LevelGoalComponent style={styles.level_goal} nav={this.props.navigation}/>
        </Animated.View>
        {/*this._showWelcomeComponentOrLevelGoalComponent()*/}
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  image_background: {
    flex: 1
  },
  welcome_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  level_goal_container: {
    flex: 1,
    /*justifyContent: 'flex-end',
    alignItems: 'center'*/
    backgroundColor: 'rgba(204, 102, 0, 0.9)',
    width: '100%',
    //height: '75%',
    alignItems: 'center',
    borderTopLeftRadius: 185,
    borderTopRightRadius: 185,
    justifyContent: 'center'
  },
  level_goal: {

  }
})

export default WelcomeScreen
