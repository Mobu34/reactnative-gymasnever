// Screens/GeneratedProgramScreen.js

import React from 'react'
import { Image, StyleSheet, View, Text, FlatList, TouchableHighlight, TouchableOpacity, Alert } from 'react-native'
import ExercisesList from '../Components/ExercisesList'
import AnimationButtonRegenerate from '../Animations/AnimationButtonRegenerate'
import AnimationButtonSave from '../Animations/AnimationButtonSave'
import AnimationButtonShare from '../Animations/AnimationButtonShare'
import { shareProgramFunction } from '../Functions/ShareProgramFunction'
import { Overlay, Tooltip } from 'react-native-elements'
import { connect } from 'react-redux'

class GeneratedProgramScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isButtonDisplayed: false,
      program: [],
      duplicate: [],
      mainColor: '#fff',
      share: '',
      allow: undefined
    }
  }

  _changeValue() {
    if (this.state.isButtonDisplayed === false) {
      this.setState({
        isButtonDisplayed: true,
        mainColor: 'grey'
      })
      this._showRegenerateButton()
      this._showSaveButton()
    }
    else {
      this.setState({
        isButtonDisplayed: false,
        mainColor: '#fff',
        share: ''
      })
    }
  }

  _regenerateTheProgram() {
    this.setState({
      program: [],
      duplicate: [],
      isButtonDisplayed: false,
      mainColor: '#fff'
    })
    const action = { type: "ERASE_PROGRAM", value: [] }
    this.props.dispatch(action)
    this._generateExercises(this.props.navigation.getParam('data'), this.props.navigation.getParam('duration'), this.props.navigation.getParam('order'))
  }

  _showRegenerateButton() {
    if (this.state.isButtonDisplayed === true) {
        return (
          <AnimationButtonRegenerate>
          <Text style={styles.text_buttons}>Regenerate</Text>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => {this._regenerateTheProgram()}}
            >
              <Image
                style={styles.images}
                source={require('../Images/ic_regenerate.png')}
              />
            </TouchableOpacity>
          </AnimationButtonRegenerate>
        )
      }
      else {
        return (
          <View></View>
        )
      }
  }

  _saveTheProgram() {
    const { generatedProgram } = this.props
    if (generatedProgram !== this.state.duplicate) {
      const action = { type: "SAVE_PROGRAM", value: generatedProgram }
      this.props.dispatch(action)
      this.setState({
        duplicate: generatedProgram,
        isButtonDisplayed: false,
        mainColor: '#fff'
      })
      Alert.alert(
        'Information',
        'This program has been saved, you will find it into the "Programs & Exercises" tab',
        {text: 'OK'}
      )
    }
    else {
        this.setState({
            isButtonDisplayed: false,
            mainColor: '#fff'
        })
        Alert.alert(
        'Warning',
        'This program has already been saved',
        {text: 'OK'}
        )
    }
  }

  _showSaveButton() {
    if (this.state.isButtonDisplayed === true) {
        return (
            <AnimationButtonSave>
              <Text style={styles.text_buttons}>Save</Text>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => {this._saveTheProgram()}}
              >
                <Image
                  style={styles.images}
                  source={require('../Images/ic_save.png')}
                />
              </TouchableOpacity>
            </AnimationButtonSave>
        )
      }
      else {
        return (
          <View></View>
        )
      }
  }

  _shareProgram() {
    const { program } = this.state
    shareProgramFunction(program)
    this.setState({
      isButtonDisplayed: false,
      mainColor: '#fff'
    })
  }

  _showShareButton() {
    const { isButtonDisplayed } = this.state
    if (isButtonDisplayed === true) {
        return (
            <AnimationButtonShare>
              <Text style={styles.text_buttons}>Share</Text>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => {this._shareProgram()}}
              >
                <Image
                  style={styles.images}
                  source={require('../Images/ic_share.png')}
                />
              </TouchableOpacity>
            </AnimationButtonShare>
        )
      }
      else {
        return (
          <View></View>
        )
      }
  }

  _buttonToRegenerateAndSave() {
    return (
      <TouchableOpacity
        style={styles.main_button}
        onPress={() => {this._changeValue()}}
      >
        <Image
          style={styles.images}
          source={require('../Images/ic_display_buttons.png')}
        />
      </TouchableOpacity>
    )
  }

  _backToInitialColor() {
    const { isButtonDisplayed, mainColor } = this.state
    if (isButtonDisplayed === true) {
      this.setState({
        isButtonDisplayed: false,
        mainColor: '#fff',
        share: ''
      })
    }
  }

  _generateExercises(data, duration, order) {
    switch (duration) {
      case 1:
        var numberOfExercises = 3
        break
      case 2:
        var numberOfExercises = 4
        break
      case 3:
        var numberOfExercises = 5
        break
      case 4:
        var numberOfExercises = 6
        break
      case 5:
        var numberOfExercises = 7
        break
      case 6:
        var numberOfExercises = 8
        break
    }
    const { program } = this.state
    const shortid = require('shortid')
    let exercisesToExclude = []
    // Create several table per order place
    for (let i = 1; i <= numberOfExercises; i++) {
      this["orderPlace" + i] = []
      for (let j = 0; j < order.length; j++) {
        if (order[j].OrderPlace === i) {
          this["orderPlace" + i].push(order[j])
        }
      }
    }
      // Create the program depending the data and the order place
      let i = 1
      while (program.length !== numberOfExercises) {
        //let randomOrder = Math.floor(Math.random() * (this["orderPlace" + i].length - 1))
        let randomExercise = Math.floor(Math.random() * (data.length - 1))
          for (let j = 0; j < this["orderPlace" + i].length; j++) {
            if (program.map(function(e) { return e.ID_SameExercise ;}).indexOf(data[randomExercise].ID_SameExercise) === -1 && data[randomExercise].ID === this["orderPlace" + i][j].ID_Exercise) {
                program.push(data[randomExercise])
                i++
                j = 0
                if (program.length === numberOfExercises) {
                  i = 1
                  j = this["orderPlace" + i].length
                }
            }
          }
      }

    for (let i = 0; i < program.length; i++) {
      program[i].ID = shortid.generate()

    }
    console.log("JE GENERE UN PROGRAMME")
    console.log(this.props.navigation)
    /*if (this.state.allow === undefined) {
      this.setState({
        allow: this.props.navigation.getParam("allow")
      })
    }*/
    if (this.props.generatedProgram.length === 0 /*&& this.props.navigation.dangerouslyGetParent().state.routes[0].routeName === "GenerateNewProgramScreen"*/) {
      const action = { type: "GENERATE_PROGRAM", value: program }
      this.props.dispatch(action)
      /*this.setState({
        allow: 0
      })*/
    }

  }

  render() {
    const { program, mainColor } = this.state
    const { generatedProgram } = this.props
    return (
      <TouchableHighlight
        style={styles.main_container}
        onPress={() => this._backToInitialColor()}
        underlayColor='#fff'
      >
        <View style={styles.main_container}>
        <ExercisesList
          data={generatedProgram}
          mainColor={mainColor}
          alldata={this.props.navigation.getParam('data')}
          order={this.props.navigation.getParam('order')}
        />
        {this._generateExercises(this.props.navigation.getParam('data'), this.props.navigation.getParam('duration'), this.props.navigation.getParam('order'))}
        {this._showRegenerateButton()}
        {this._showSaveButton()}
        {this._showShareButton()}
        {this._buttonToRegenerateAndSave()}
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  main_button: {
    position: 'absolute',
    backgroundColor: '#295aff',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  images: {
    width: 30,
    height: 30
  },
  buttons: {
    position: 'absolute',
    backgroundColor: '#99c7ff',
    width: 40,
    height: 40,
    right: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text_buttons: {
    position: 'absolute',
    right: 95,
    top: 11,
    backgroundColor: '#fff',
    paddingHorizontal: 3
  }
})

const mapStateToProps = (state) => {
  return {
    savedPrograms: state.saveProgram.savedPrograms,
    generatedProgram: state.generateProgram.generatedProgram
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneratedProgramScreen)
