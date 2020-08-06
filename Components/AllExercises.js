// Components/AllExercises.js

import React from 'react'
import { StyleSheet, View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import Data from '../Data/Data'
import { requestAllExercises } from '../Data/DataFromServer'
import { connect } from 'react-redux'

class AllExercises extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      exercises: undefined,
      isLoading: true
    }
  }

  _displayExercises() {
    /*const { targetMuscle, exercises} = this.props
    requestAllExercises(targetMuscle).then(data => {
      console.log(data)
      //for (let i = 0; i < data.length, i++) {
        this.setState({
          exercises: data
        })
      //}
      if (exercises === undefined || exercises[0].ID_Muscle === data[0].ID_Muscle)
      this.setState({
        exercises: data
      })
      console.log(exercises)

    })*/
  }

  _detailsOfExercises(details, id) {
    this.props.nav.navigate("ExerciseDetailsScreen", {
      details: details[id]
    })
  }

  render() {
    const { exercises, isLoading } = this.state
    const { data } = this.props
    return (
      <View style={styles.main_container}>
        {this._displayExercises()}
        <FlatList
          data={data}
          keyExtractor={(item) => item.ID.toString()}
          renderItem={({item, index}) => <TouchableOpacity onPress={() => this._detailsOfExercises(exercises, index)}>
            <Text>{item.Name}</Text>
          </TouchableOpacity>
        }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = (state) => {
  return {
    level: state.selectLevel.level,
    goal: state.selectGoal.goal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllExercises)
