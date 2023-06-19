import { useRecoilValue, useSetRecoilState } from "recoil"
import * as state from "@/store"

export default function useCreateTeam() {
  const playersInLineup = useRecoilValue(state.playersInLineup)
  const setTeamTables = useSetRecoilState(state.teamTables)

  function createTeam(autoPop) {
    for (let i = 0; i < autoPop.length; i++) {
      for (let j = 0; j < autoPop[i].length; j++) {
        let newPlayerObj = playersInLineup[autoPop[i][j]]
        let name = "team" + i
        setTeamTables((prevTeamTables) => ({
          ...prevTeamTables,
          [name]: prevTeamTables[name].concat(newPlayerObj),
        }))
      }
    }
  }

  return createTeam
}
