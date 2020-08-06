// Functions/GenerateUniqueKeyFunction.js

export function generateUniqueKeyFunction(key) {
  const shortid = require("shortid")
  key = shortid.generate()
  return (
    key
  )
}
