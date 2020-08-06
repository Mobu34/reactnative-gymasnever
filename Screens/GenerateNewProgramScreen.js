// Components/GenerateNewProgramScreen.js

import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { requestProgram, requestProgramWithSpecificPart, requestNewProgram, requestOrder } from '../Data/DataFromServer'
import { connect } from 'react-redux'
//import Icon from 'react-native-vector-icons/Navigation'

class GenerateNewProgramScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectMuscle: null,
      selectPart: null,
      selectDuration: null,
      optionsHaveChanged: false
    }
  }

  _GenerateNewProgram() {
    if (this.state.selectMuscle !== null && this.state.selectDuration !== null) {
      const action = { type: "ERASE_PROGRAM", value: [] }
      this.props.dispatch(action)
      const { selectMuscle, selectPart, selectDuration } = this.state
      const { level, goal } = this.props
      if (selectPart !== null) {
        requestProgramWithSpecificPart(selectMuscle, selectPart, level, goal).then(data => {
          this.props.navigation.navigate("GeneratedProgramScreen", {
            data: data,
            duration: selectDuration
          })
        })

      }
      else {
        const allowTheCreation = 1
        console.log(allowTheCreation)
        requestOrder(selectDuration, selectMuscle).then(dataOrder => {
          requestNewProgram(selectMuscle, goal, level).then(data => {
            this.props.navigation.navigate("GeneratedProgramScreen", {
              data: data,
              duration: selectDuration,
              order: dataOrder,
              allow: allowTheCreation
            })
          })
        })
      }
    }
  }

  _displayPickerForPart() {
    const { level } = this.props
    const { selectMuscle, selectPart } = this.state
    if (level != 'Junior' && (selectMuscle !== null && selectMuscle !== 'Biceps' && selectMuscle !== 'Triceps')) {
      const shoulderTab = ['Mass', 'Lateral', 'Front', 'Rear', 'Trap']
      const chestTab = ['Middle', 'Upper', 'Lower']
      const backTab = ['Width', 'Thickness']
      const legsTab = ['Quadriceps', 'Ischio', 'Adductor', 'Abductor', 'Butt']
      switch (selectMuscle) {
        case 1:
          var rightMuscleTab = shoulderTab
          break
        case 'Chest':
          var rightMuscleTab = chestTab
          break
        case 'Back':
          var rightMuscleTab = backTab
          break
        case 'Legs':
          var rightMuscleTab = legsTab
          break
      }
      let partTab = []
      for (var i = 0; i < rightMuscleTab.length; i++) {
        const part =
          {
            label: rightMuscleTab[i],
            value: rightMuscleTab[i],
            key: i
          }
        partTab.push(part)
      }
      const placeholderPart = {
        label: 'Select a part...',
        value: null
      }
      return (
        <View>
          <Text>Specific part of the muscle (optional)</Text>
          <RNPickerSelect
            items={partTab}
            placeholder={placeholderPart}
            placeholderTextColor={'orange'}
            onValueChange={(value) => {
              this.setState({
                selectPart: value
              })
            }}
            value={selectPart}
            style={styles.picker}
          />
        </View>
      )
    }
  }

  render() {
    const muscles = [
      {
        label: 'Shoulder',
        value: 1,
        key: 0
      },
      {
        label: 'Chest',
        value: 2,
        key: 1
      },
      {
        label: 'Back',
        value: 3,
        key: 2
      },
      {
        label: 'Biceps',
        value: 4,
        key: 3
      },
      {
        label: 'Triceps',
        value: 5,
        key: 4
      },
      {
        label: 'Legs',
        value: 6,
        key: 5
      },
    ]
    const duration = [
      {
        label: "30 Minutes",
        value: 1,
        key: 0
      },
      {
        label: "45 Minutes",
        value: 2,
        key: 1
      },
      {
        label: "1 Heure",
        value: 3,
        key: 2
      },
      {
        label: "1 Heure 15",
        value: 4,
        key: 3
      },
      {
        label: "1 Heure 30",
        value: 5,
        key: 4
      },
      {
        label: "2 Heures",
        value: 6,
        key: 5
      },
    ]
    const placeholderMuscle = {
      label: 'Select a muscle...',
      value: null
    }
    const placeholderDuration = {
      label: 'Select a duration...',
      value: null
    }
    return (
      <View style={styles.main_container}>
        <View style={styles.picker_container}>
          <View>
            <Text>Muscle to train</Text>
            <RNPickerSelect
              items={muscles}
              placeholder={placeholderMuscle}
              placeholderTextColor={'orange'}
              onValueChange={(value) => {
                this.setState({
                  selectMuscle: value
                })
              }}
              value={this.state.selectMuscle}
            />
          </View>
            {this._displayPickerForPart()}
          <View>
            <Text>Duration of the training</Text>
            <RNPickerSelect
              items={duration}
              placeholder={placeholderDuration}
              placeholderTextColor={'orange'}
              onValueChange={(value) => {
                this.setState({
                  selectDuration: value
                })
              }}
              value={this.state.selectDuration}
              style={styles.select}
            />
          </View>
        </View>
        <View>
          <Button title="Generate" onPress={() => {this._GenerateNewProgram()}} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  picker_container: {
    height: 150,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  muscle_duration_picker_container: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black'
  },
  picker: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5
  }
})

const mapStateToProps = (state) => {
  return {
    level: state.selectLevel.level,
    goal: state.selectGoal.goal,
    generatedProgram: state.generateProgram.generatedProgram
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateNewProgramScreen)
