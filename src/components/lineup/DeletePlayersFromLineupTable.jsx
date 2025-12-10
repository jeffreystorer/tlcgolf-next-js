'use client';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useGetPlayersInGroup } from '@/components/common/hooks';
import { SortOrderDropdown } from '@/components/lineup/dropdowns';
import * as state from '@/store';

export default function DeletePlayersFromLineupTable() {
  const idsInLineup = useRecoilValue(state.idsInLineup);
  const course = useRecoilValue(state.course);
  const teesSelected = useRecoilValue(state.teesSelected);
  const getPlayersInGroup = useGetPlayersInGroup();
  const playersInGroup = getPlayersInGroup(
    'createLineupTable',
    teesSelected[course]
  );
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

  function generateListItems() {
    let listItems = playersInLineup.map((player) => (
      <li key={uuidv4()} onClick={handleClick(player.id)}>
        {player.playerName}
      </li>
    ));
    return listItems;
  }

  function handleClear() {
    resetPlayersInLineup();
  }

  return (
    <div className='players'>
      <h4>{deletePlayerCount} In Lineup</h4>
      <ul>{generateListItems()}</ul>
      <div className='divider'></div>
      <SortOrderDropdown />
      <button className='stacked' onClick={handleClear}>
        Clear
      </button>
    </div>
  );
}
