'use client';
import { useSetRecoilState, useRecoilValue } from 'recoil';
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
    <div id='add-players' className='titled_inner'>
      <h3>Add/Delete Players In Lineup</h3>
      <div>
        {addPlayerCount > 0 && <AddPlayersToLineupTable />}
        {deletePlayerCount > 0 && <DeletePlayersFromLineupTable />}
      </div>
      <button className='stacked' onClick={handleDone}>
        Done
      </button>
    </div>
  );
}
