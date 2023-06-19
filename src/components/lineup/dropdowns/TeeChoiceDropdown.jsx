//child of TeamTable

import React from 'react';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';
import { useRecomputeTeamTables } from '@/components/lineup/hooks';
import * as state from '@/store';
import { buildTeeArray } from '@/components/common/utils';

export default function TeeChoiceDropdown({ playerId, teamNumber, baseTee }) {
  const course = useRecoilValue(state.course);
  const recomputeTeamTables = useRecomputeTeamTables();
  const teamTables = useRecoilValue(state.teamTables);
  const teesSelected = useRecoilValue(state.teesSelected);
  const teesSelectedArray = buildTeeArray(teesSelected[course]);
  const teeChoiceOptionItems = teesSelectedArray.map((tee) => (
    <option key={uuidv4()} value={tee}>
      {tee}
    </option>
  ));
  let newTeamTables = _.cloneDeep(teamTables);
  let teamName, playerIndex;

  function handleTeeChoiceChange(event) {
    const aTeeChoice = event.target.value;
    const anId = Number(event.target.name);
    const aTeamNumber = event.target.id;
    teamName = 'team' + aTeamNumber;
    playerIndex = teamTables[teamName].findIndex(
      (player) => player.id === Number(anId)
    );
    newTeamTables[teamName][playerIndex].teeChoice = aTeeChoice;
    recomputeTeamTables(playerIndex, newTeamTables, teamName);
  }

  return (
    <>
      <td className='select-dropdown-container'>
        <label>
          <select
            id={teamNumber}
            name={playerId}
            value={baseTee}
            onChange={handleTeeChoiceChange}>
            {teeChoiceOptionItems}
          </select>
        </label>
      </td>
    </>
  );
}
