// Store/Reducers/generateProgram.js

const initialState = { generatedProgram: [] }

function generateProgram(state = initialState, action) {
  let nextState
  switch(action.type) {
    case 'ERASE_PROGRAM':
    console.log("case ERASE_PROGRAM")
      nextState = {
        ...state,
        generatedProgram: action.value
      }
    case 'GENERATE_PROGRAM':
      console.log('Reducer GENERATE_PROGRAM')
      nextState = {
        ...state,
        generatedProgram: action.value
      }
      return nextState || state
    case 'CHANGE_EXERCISE':
      //console.log(action.value[0])
      //console.log(action.value[1])
      state.generatedProgram.splice(action.value[0], 1, action.value[1])
      nextState = {
        ...state,
        generatedProgram: [...state.generatedProgram]
      }
      return nextState || state

    default:
      return state
  }
}
export default generateProgram
