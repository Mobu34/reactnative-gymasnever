// Components/ExerciseItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class ExerciseItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isExerciseChanged: false
    }
  }

  _number(data, exercise) {
    if (this.props.generatedProgram.length === 0) {
      data = this.props.program
    }
    for (var i = 0; i <= data.length; i++) {
      if (data[i] === exercise) {
        return (
          <Text>{i + 1}</Text>
        )
      }
    }

  }

  _showChangeThisExercise() {
    const { exercise, number, program, alldata, order, generatedProgram, data } = this.props
    if (this.props.generatedProgram.length === 0) {
      return (
        <View>
        </View>
      )
    }
    else {
      return (
        <View style={styles.change_button_container}>
          <TouchableOpacity
            onPress={() => this._changeThisExercise(program, exercise, alldata, order)}
          >
            <Image
              style={styles.images}
              source={require('../Images/ic_regenerate.png')}
            />
          </TouchableOpacity>
        </View>
      )
    }
  }

  _changeThisExercise(oldProgram, exercise, data, order) {
    let newProgram = oldProgram
    const indexExercise = oldProgram.indexOf(exercise) + 1
    const { isExerciseChanged } = this.state
      this["orderPlace" + indexExercise] = []
      let orderPlaceArr = this["orderPlace" + indexExercise]
      for (let i = 0; i < order.length; i++) {
        if (order[i].OrderPlace === indexExercise) {
          orderPlaceArr.push(order[i])
        }
      }

        let stopLoop = 1
        let exercisesForOrderPlace = []
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < orderPlaceArr.length; j++) {
            if (data[i].ID === orderPlaceArr[j].ID_Exercise) {
              exercisesForOrderPlace.push(data[i])
            }
          }
        }

        while (0 < stopLoop) {
          let randomExercise = Math.floor(Math.random() * (exercisesForOrderPlace.length - 1))
          if (newProgram.map(function(e) { return e.ID_SameExercise ;}).indexOf(exercisesForOrderPlace[randomExercise].ID_SameExercise) === -1/* && exercisesForOrderPlace[randomExercise].ID === orderPlaceArr[indexExercise].ID_Exercise*/) {
              newProgram.splice(indexExercise-1, 1, exercisesForOrderPlace[randomExercise])
              const shortid = require('shortid')
              newProgram[indexExercise-1].ID = shortid.generate()
              stopLoop = 0
          }
        }

        const action = { type: "CHANGE_EXERCISE", value: [indexExercise - 1, newProgram[indexExercise - 1]]}
        this.props.dispatch(action)
        /*if (isExerciseChanged === false) {
          this.setState({
            isExerciseChanged: true
          })
        }*/
  }

  render() {
    const { exercise, number, program, alldata, order, generatedProgram } = this.props
    return (
      <View style={styles.main_container}>
        <View style={styles.exercise_container}>
          <Text style={styles.exercise_text}>Exercise n°{this._number(generatedProgram, exercise)}</Text>
          <Text >{exercise.Name}</Text>
          <Text>{exercise.Reps} reps in {exercise.Tempo} execution</Text>
        </View>
        {this._showChangeThisExercise()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    //backgroundColor: 'yellow'
  },
  exercise_container: {
    flex: 4,
    paddingLeft: 20
  },
  change_button_container: {
    flex: 1,
    //backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50
  },
  exercise_text: {
    fontWeight: 'bold'
  },
  images: {
    height: 20,
    width: 20
  }
})

const mapStateToProps = (state) => {
  return {
    generatedProgram: state.generateProgram.generatedProgram
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseItem)
