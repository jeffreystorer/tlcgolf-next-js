import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { TitledBox } from '@/components/common';
import {
  AddPlayersToLineupTable,
  DeletePlayersFromLineupTable,
} from '@/components/lineup';
import { usePlayersNotInLineup } from '@/components/lineup/hooks';
import * as state from '@/store';

export default function AddDeletePlayersInLineup() {
  const playersNotInLineup = usePlayersNotInLineup();
  const setShowAddDeletePlayers = useSetRecoilState(state.showAddDeletePlayers);
  const setShowAddDeletePlayersButton = useSetRecoilState(
    state.showAddDeletePlayersButton
  );
  const playersInLineup = useRecoilValue(state.playersInLineup);

  const addPlayerCount = playersNotInLineup().length;
  const deletePlayerCount = playersInLineup.length;

  function handleDone() {
    setShowAddDeletePlayers(false);
    setShowAddDeletePlayersButton(true);
  }

  return (
    <div id='add-players-box'>
      <TitledBox id='add-players-box' title={'Add/Delete Players In Lineup'}>
        <div id='add-players'>
          {addPlayerCount > 0 && <AddPlayersToLineupTable />}
          {deletePlayerCount > 0 && <DeletePlayersFromLineupTable />}
        </div>
        <button className='stacked' onClick={handleDone}>
          Done
        </button>
      </TitledBox>
    </div>
  );
}
