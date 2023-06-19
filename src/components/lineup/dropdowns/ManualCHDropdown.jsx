//child of TeamTable

import React from 'react';
import { useRecoilValue } from 'recoil';
import * as _ from 'lodash';
import { useRecomputeTeamTables } from '@/components/lineup/hooks';
import * as options from '@/components/lineup/optionitems';
import * as state from '@/store';

export default function ManualCHDropdown({ manualCH, playerId, teamNumber }) {
  const recomputeTeamTables = useRecomputeTeamTables();
  const teamTables = useRecoilValue(state.teamTables);
  let newTeamTables = _.cloneDeep(teamTables);
  let teamName, playerIndex;

  const handleManualCHChange = (event) => {
    const aManualCH = event.target.value;
    const anId = Number(event.target.name);
    const aTeamNumber = event.target.id;
    teamName = 'team' + aTeamNumber;
    playerIndex = teamTables[teamName].findIndex(
      (player) => player.id === Number(anId)
    );
    newTeamTables[teamName][playerIndex].manualCH = aManualCH;
    recomputeTeamTables(playerIndex, newTeamTables, teamName);
  };

  return (
    <>
      <td className='select-dropdown-container'>
        <label className='embedded-selector'>
          <select
            className='select-manual-CH'
            id={teamNumber}
            name={playerId}
            value={manualCH}
            onChange={handleManualCHChange}>
            {options.manualCHOptionItems}
          </select>
        </label>
      </td>
    </>
  );
}
