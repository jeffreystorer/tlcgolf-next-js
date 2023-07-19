import { useRecoilValue, useRecoilState } from 'recoil';
import * as _ from 'lodash';
import {
  buildTeeArray,
  createPlayersArray,
  returnCourseHandicapArray,
} from '@/components/common/utils';
import { getGender } from '@/components/lineup/hooks/utils';
import * as state from '@/store';

export default function useUpdateTeamTables() {
  const [teamTables, setTeamTables] = useRecoilState(state.teamTables);
  const teeTimeCount = useRecoilValue(state.teeTimeCount);
  const group = useRecoilValue(state.group);
  const sortOrder = useRecoilValue(state.sortOrder);

  function updateTeamTables(course, teesSelected) {
    const notUsed = '';
    const playersInGroup = createPlayersArray(
      'createLineupTable', //playersArrayType
      notUsed, //showLocalNumbers
      notUsed, //showFirstName
      course, //course
      group, //group
      teesSelected, //teeSelected
      notUsed, //teamTables
      notUsed, //teeTimeCount
      sortOrder //sortOrder
    );
    const teesSelectedArray = buildTeeArray(teesSelected);
    let newTeamTables = _.cloneDeep(teamTables);
    for (let i = 0; i < teeTimeCount; i++) {
      let aTeamName = 'team' + i;
      try {
        let aPlayerCount = newTeamTables[aTeamName].length;
        for (let j = 0; j < aPlayerCount; j++) {
          let aTeamMemberId = newTeamTables[aTeamName][j].id;
          let aPlayerObj = playersInGroup.find(
            (obj) => obj.id === aTeamMemberId
          );
          newTeamTables[aTeamName][j].playerName = aPlayerObj.playerName;
          newTeamTables[aTeamName][j].strHcpIndex = aPlayerObj.strHcpIndex;
          newTeamTables[aTeamName][j].teeChoice = aPlayerObj.teeChoice;
          updatePlayerOnTeam(aTeamName, j);
        }
      } catch (error) {
        console.log(
          'useUpdateTeam Tables: error updating Team Tables for: ' + aTeamName
        );
      }
    }

    setTeamTables(newTeamTables);

    function updatePlayerOnTeam(teamName, playerIndex) {
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
              teesSelected
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
          newTeamTables[teamName][playerIndex].courseHandicaps[teeNo] =
            aManualCH;
          if (!newTeamTables[teamName][playerIndex].playerName.endsWith('*')) {
            newTeamTables[teamName][playerIndex].playerName =
              newTeamTables[teamName][playerIndex].playerName + '*';
          }
          break;
      }
    }
  }

  return updateTeamTables;
}
