export default function teamTablesEmpty(teamTables) {
  let empty = true
  let teamName
  try {
    for (let i = 0; 9; i++) {
      teamName = "team" + i
      if (teamTables[teamName].length > 0) empty = false
    }
  } catch (error) {}
  return empty
}
