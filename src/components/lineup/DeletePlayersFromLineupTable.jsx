import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { SortOrderDropdown } from '@/components/lineup/dropdowns';
import * as state from '@/store';

export default function DeletePlayersFromLineupTable() {
  const idsInLineup = useRecoilValue(state.idsInLineup);
  const playersInGroup = useRecoilValue(state.playersInGroup);
  const [teamTables, setTeamTables] = useRecoilState(state.teamTables);
  const teeTimeCount = useRecoilValue(state.teeTimeCount);
  const [playersInLineup, setPlayersInLineup] = useRecoilState(
    state.playersInLineup
  );
  const deletePlayerCount = playersInLineup.length;
  const resetPlayersInLineup = useResetRecoilState(state.playersInLineup);

  function handleDeletePlayersClick(idsToBeDeleted) {
    deletePlayersFromTeams(idsToBeDeleted);
  }

  function deletePlayersFromTeams(idsToBeDeleted) {
    let newTeamTables = _.cloneDeep(teamTables);
    idsToBeDeleted.forEach(deletePlayer);
    setTeamTables(newTeamTables);

    function deletePlayer(item, index) {
      let id = parseInt(item);
      let i, j;
      for (i = 0; i < teeTimeCount; i++) {
        let teamName = 'team' + i;
        let memberCount = newTeamTables[teamName].length;
        for (j = 0; j < memberCount; j++) {
          newTeamTables = processTeamTables(newTeamTables, teamName);
        }
      }

      function processTeamTables(newTeamTables, teamName) {
        return {
          ...newTeamTables,
          [teamName]: newTeamTables[teamName].filter(
            (player) => player.id !== id
          ),
        };
      }
    }
  }

  const handleClick = (idToBeDeleted) => (event) => {
    const idsToBeDeleted = [idToBeDeleted.toString()];
    let newIdsInLineup = [];
    idsInLineup.forEach((id) => {
      if (idsToBeDeleted.includes(id) === false) {
        newIdsInLineup.push(id);
      }
    });
    let newPlayersInLineupArray = [];
    playersInGroup.forEach((player) => {
      if (newIdsInLineup.includes(player.id.toString()) === true) {
        newPlayersInLineupArray.push(player);
      }
    });
    setPlayersInLineup(newPlayersInLineupArray);
    handleDeletePlayersClick(idsToBeDeleted);
  };

  function generatePlayersInLineupRows() {
    let rowsTD = playersInLineup.map((player) => (
      <tr key={uuidv4()} onClick={handleClick(player.id)}>
        <td>{player.playerName}</td>
      </tr>
    ));
    return rowsTD;
  }

  function handleClear() {
    resetPlayersInLineup();
  }

  return (
    <>
      <table className='sideBySideTable'>
        <tbody>
          <tr className='text--underlined'>
            <td>{deletePlayerCount} In Lineup</td>
          </tr>
          {generatePlayersInLineupRows()}
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td>
              <SortOrderDropdown />
            </td>
          </tr>
          <tr>
            <td>
              <button className='button stacked' onClick={handleClear}>
                Clear
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
