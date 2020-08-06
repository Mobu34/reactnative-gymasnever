// Aimations/AnimationLevelGoal.js

import React from 'react'
import { StyleSheet, Animated, Dimensions, View } from 'react-native'

class AnimationLevelGoal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rightPosition: new Animated.Value(Dimensions.get('window').width),
      topPosition: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.rightPosition,
      {
        toValue: 0,
        duration: 1000
      }
    ).start()
  }

  componentWillUnmount() {
    Animated.timing(
      this.state.topPosition,
      {
        toValue: -200,
        duration: 1000
      }
    ).start()
  }

  render() {
    return (
      <View>
        <Animated.View
          style={[ styles.welcome_container, {right: this.state.rightPosition, top: this.state.topPosition }]}
        >
          {this.props.children}
        </Animated.View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  welcome_container: {
    /*flex: 1,
    justifyContent: 'center',
    alignItems: 'center'*/
  }
})

export default AnimationLevelGoal
