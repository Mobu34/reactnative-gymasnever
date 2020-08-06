import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import ExerciseItem from './ExerciseItem'

class ExercisesList extends React.Component {

  _getData(id) {
    if (this.props.navigation !== undefined) {
      return (
        this.props.navigation.getParam('data')
      )
    }
    else {
      return (
        this.props.generatedProgram
      )
    }
  }

//
  render() {
    const { mainColor, alldata, order } = this.props
    return (
      <View style={[styles.main_container, {backgroundColor: mainColor}]}>
        <FlatList
          style={styles.flatlist}
          data={this._getData()}
          keyExtractor={(item) => item.ID}
          renderItem={({item, index}) => <ExerciseItem exercise={item} number={this._getData(item)} program={this._getData()} alldata={alldata} order={order} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  }
})

const mapStateToProps = (state) => {
  return {
    generatedProgram: state.generateProgram.generatedProgram
  }
}

export default connect(mapStateToProps)(ExercisesList)
