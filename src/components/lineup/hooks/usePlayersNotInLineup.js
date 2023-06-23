import { useRecoilValue } from "recoil"
import * as state from "@/store"

export default function usePlayersNotInLineup() {
  const playersInGroup = useRecoilValue(state.playersInGroup)
  const idsInLineup = useRecoilValue(state.idsInLineup)

  function playersNotInLineup() {
    let playersNotInLineupArray = []

    playersInGroup.forEach((player) => {
      if (idsInLineup.includes(player.id.toString()) === false) {
        playersNotInLineupArray.push(player)
      }
    })
    return playersNotInLineupArray
  }
  return playersNotInLineup
}
