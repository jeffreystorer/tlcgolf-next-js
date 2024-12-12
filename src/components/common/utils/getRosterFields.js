
export const indexOfGolfer = (roster, ghinNumber) => {
  var i = 1
  var golferFound = false
  do {
    golferFound = roster[i].includes(ghinNumber)
    i++
  } while (!golferFound)
  return i - 1
}

export const aLastName = (roster, ghinNumber) => {
  return roster[indexOfGolfer(roster, ghinNumber)][roster[0].indexOf("Last Name")]
}

export const aLocalNumber = (roster, ghinNumber) => {
  return roster[indexOfGolfer(roster, ghinNumber)][roster[0].indexOf("Local Number")]
}

export const aFirstName = (roster, ghinNumber) => {
  let rawName = roster[indexOfGolfer(roster, ghinNumber)][roster[0].indexOf("First Name")]
  let fixedName = rawName.toLowerCase()
  return capitalize(fixedName)
}
const capitalize = (s) => {
  if (typeof s !== "string") return ""
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const anIndex = (roster, ghinNumber) => {
  let rawIndex = roster[indexOfGolfer(roster, ghinNumber)][roster[0].indexOf("H.I.")]
  let index = Number(rawIndex.replace("+", "-")).toFixed(1)
  return index
}

export const aGender = (roster, ghinNumber) => {
  return roster[indexOfGolfer(roster, ghinNumber)][roster[0].indexOf("Gender")]
}
