//child of TeamTable

import React from "react"
import { useRecoilState } from "recoil"
import { v4 as uuidv4 } from "uuid"
import * as _ from "lodash"
import * as state from "@/store"

export default function WalkRideDropdown({ walk, playerId, teamNumber }) {
  const [teamTables, setTeamTables] = useRecoilState(state.teamTables)
  let walkRideArray = ["W", "R"]
  const walkRideOptionItems = walkRideArray.map((wr) => (
    <option key={uuidv4()} value={wr}>
      {wr}
    </option>
  ))
  let newTeamTables = _.cloneDeep(teamTables)
  let teamName, playerIndex

  function handleWalkRideChange(event) {
    const walkRide = event.target.value
    const anId = Number(event.target.name)
    const aTeamNumber = event.target.id
    teamName = "team" + aTeamNumber
    playerIndex = teamTables[teamName].findIndex(
      (player) => player.id === Number(anId)
    )
    newTeamTables[teamName][playerIndex].walk = walkRide
    setTeamTables(newTeamTables)
  }

  return (
    <>
      <td className="select-dropdown-container">
        <label>
          <select
            id={teamNumber}
            name={playerId}
            value={walk}
            onChange={handleWalkRideChange}
          >
            {walkRideOptionItems}
          </select>
        </label>
      </td>
    </>
  )
}
