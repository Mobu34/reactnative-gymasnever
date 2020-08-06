// Data/DataFromServer.js

export function requestNewProgram (muscle, goal, level) {
    const url = 'http://localhost:3000/requestexercises/' + muscle + '/' + goal + '/' + level
    return fetch(url)
        .then((res) => res.json())
        .catch((err) => console.error(err))
}

export function requestOrder (duration, muscle) {
    const url = 'http://localhost:3000/requestorder/' + duration + '/' + muscle
    return fetch(url)
        .then((res) => res.json())
        .catch((err) => console.err(err))
}

export function requestProgram (muscle, level, goal) {
  const url = 'http://localhost:3000/request/' + muscle + '/' + level + '/' + goal
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function requestProgramWithSpecificPart (muscle, part, level, goal) {
  const url = 'http://localhost:3000/specificpart' + '/' + muscle + '/' + part + '/' + level + '/' + goal
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function requestAllExercises(muscle) {
  const url = 'http://localhost:3000/requestallexercises/' + muscle
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function requestDetails(exercise) {
  const url = 'http://localhost:3000/details/' + exercise
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

/*export function requestLogin(username, password) {
  const url = 'http://localhost:3000/login/' + username + '/' + password
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function requestIfUsernameIsExisting(username) {
  const url = 'http://localhost:3000/username/' + username
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function requestIfEmailIsExisting(email) {
  const url = 'http://localhost:3000/email/' + email
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function requestNewAccount(username, password, email) {
  const url = 'http://localhost:3000/accounts/' + username + '/' + password + '/' + email
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}*/
