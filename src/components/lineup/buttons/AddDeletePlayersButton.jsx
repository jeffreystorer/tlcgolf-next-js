import React from 'react';
import { useSetRecoilState } from 'recoil';
import * as state from '@/store';

export default function AddDeletePlayersButton() {
  const setShowAddDeletePlayers = useSetRecoilState(state.showAddDeletePlayers);
  const setShowAddDeletePlayersButton = useSetRecoilState(
    state.showAddDeletePlayersButton
  );

  function handleClick(event) {
    event.preventDefault();
    setShowAddDeletePlayers(true);
    setShowAddDeletePlayersButton(false);
  }

  return (
    <button className='stacked' onClick={handleClick}>
      Add/Delete Players
    </button>
  );
}
