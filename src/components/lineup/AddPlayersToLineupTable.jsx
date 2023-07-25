import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { usePlayersNotInLineup } from '@/components/lineup/hooks';
import * as state from '@/store';

export default function AddPlayersToLineupTable() {
  const playersNotInLineup = usePlayersNotInLineup();
  const idsInLineup = useRecoilValue(state.idsInLineup);
  const playersInGroup = useRecoilValue(state.playersInGroup);
  const setPlayersInLineup = useSetRecoilState(state.playersInLineup);

  const addPlayerCount = playersNotInLineup().length;

  const handleClick = (idToBeAdded) => (event) => {
    const idsAddedToLineupArray = [idToBeAdded];
    const oldIdsInLineup = idsInLineup;
    const newIdsInLineup = oldIdsInLineup.concat(idsAddedToLineupArray);
    let newPlayersInLineupArray = [];
    newIdsInLineup.forEach((id) => {
      newPlayersInLineupArray.push(
        playersInGroup.find((player) => player.id === Number(id))
      );
    });
    sortAlphabetical(newPlayersInLineupArray);
  };

  function sortAlphabetical(newPlayersInLineupArray) {
    newPlayersInLineupArray.sort((a, b) =>
      a.lastName > b.lastName
        ? 1
        : a.lastName === b.lastName
        ? a.firstName > b.firstName
          ? 1
          : -1
        : -1
    );
    setPlayersInLineup(newPlayersInLineupArray);
  }

  function generateListItems() {
    let listItems = playersNotInLineup().map((player) => (
      <li key={uuidv4()} onClick={handleClick(player.id)}>
        {player.playerName}
      </li>
    ));
    return listItems;
  }

  return (
    <div className='players'>
      <p>{addPlayerCount} Not In Lineup</p>
      <ul>{generateListItems()}</ul>
    </div>
  );
}
