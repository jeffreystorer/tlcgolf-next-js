import { useRecoilValue, useSetRecoilState } from 'recoil';
import * as state from '@/store';
import {
  buildTeeArray,
  returnCourseHandicapArray,
} from '@/components/common/utils';
import { getGender } from '@/components/lineup/hooks/utils';

export default function useRecomputeTeamTables() {
  const course = useRecoilValue(state.course);
  const teesSelected = useRecoilValue(state.teesSelected);
  const teesSelectedArray = buildTeeArray(teesSelected[course]);
  const setTeamTables = useSetRecoilState(state.teamTables);

  function recomputeTeamTables(playerIndex, newTeamTables, teamName) {
    const aTeeChoice = newTeamTables[teamName][playerIndex].teeChoice;
    let teeNo = teesSelectedArray.indexOf(aTeeChoice);
    if (teeNo < 0) teeNo = 0;
    const strHcpIndex = newTeamTables[teamName][playerIndex].strHcpIndex;
    const gender = getGender(
      newTeamTables[teamName][playerIndex].id.toString()
    );
    const aManualCH = newTeamTables[teamName][playerIndex].manualCH;
    const playerName = newTeamTables[teamName][playerIndex].playerName;
    if (playerName.endsWith('*')) {
      const newPlayerName = playerName.slice(0, -1);
      newTeamTables[teamName][playerIndex].playerName = newPlayerName;
    }
    switch (aManualCH) {
      case 'Auto':
        newTeamTables[teamName][playerIndex].courseHandicaps =
          returnCourseHandicapArray(
            gender,
            strHcpIndex,
            course,
            teesSelected[course]
          );
        break;
      case '-':
        for (let j = 0; j < teesSelectedArray.length; j++) {
          newTeamTables[teamName][playerIndex].courseHandicaps[j] = 'X';
        }
        break;
      default:
        for (let j = 0; j < teesSelectedArray.length; j++) {
          newTeamTables[teamName][playerIndex].courseHandicaps[j] = '*';
        }
        newTeamTables[teamName][playerIndex].courseHandicaps[teeNo] = aManualCH;
        if (!newTeamTables[teamName][playerIndex].playerName.endsWith('*')) {
          newTeamTables[teamName][playerIndex].playerName =
            newTeamTables[teamName][playerIndex].playerName + '*';
        }
        break;
    }
    setTeamTables(newTeamTables);
  }

  return recomputeTeamTables;
}
