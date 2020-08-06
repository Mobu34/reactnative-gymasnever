// Components/ProgramsScreen.js

import React from 'react'
import { FlatList, Platform, StyleSheet, View, Text, Button, TouchableOpacity, Image } from 'react-native'
import { DrawerActions } from 'react-navigation-drawer'
import { connect } from 'react-redux'
import ProgramItem from '../Components/ProgramItem'
import { generateUniqueKeyFunction } from '../Functions/GenerateUniqueKeyFunction'

class ProgramsScreen extends React.Component {
  
  _showPrograms() {
    const { savedPrograms, generatedProgram } = this.props
    if (savedPrograms.length === 0) {
      return (
        <Text>No programs</Text>
      )
    }
    else {
      return (
        <FlatList
          style={styles.flatlist_container}
          data={savedPrograms}
          keyExtractor={(item) => generateUniqueKeyFunction(item.ID)}
          renderItem={({item, index}) => <ProgramItem program={item} id={index} nav={this.props.navigation} />}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._showPrograms()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  flatlist_container: {
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

export default connect(mapStateToProps)(ProgramsScreen)
