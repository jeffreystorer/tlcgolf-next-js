'use client';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useCreateTeam } from '@/components/lineup/hooks';
import * as state from '@/store';
import { setAutoPop } from '@/components/lineup/utils';

export default function AutoPopButton() {
  const sortOrder = useRecoilValue(state.sortOrder)
  const createTeam = useCreateTeam();
  const idsInLineup = useRecoilValue(state.idsInLineup);
  const teeTimeCount = useRecoilValue(state.teeTimeCount);
  const setShowAddDeletePlayers = useSetRecoilState(state.showAddDeletePlayers);
  const setShowAddDeletePlayersButton = useSetRecoilState(
    state.showAddDeletePlayersButton
  );
  const playerCount = idsInLineup.length;

  let order;
  switch (sortOrder) {
    case 'alphabetical':
      order = 'Alpha';
      break;
    case 'byHandicap':
      order = 'By Course Hcp';
      break;
    case 'random':
      order = 'Random';
      break;
    default:
      break;
    }

  function handleClick() {
    const teeTimes = Number(teeTimeCount);
    const players = Number(playerCount);
    const autoPop = setAutoPop(teeTimes, players);
    setShowAddDeletePlayers(false);
    setShowAddDeletePlayersButton(true);
    createTeam(autoPop);
  }
  return (
    <button className='not-stacked' onClick={handleClick}>
      <>
      {sortOrder === 'byHandicap' && <div>Create Teams {order} ({playerCount} players)</div>}
      {sortOrder === 'random' && <div>Create {order} Teams ({playerCount} players)</div>}
      {sortOrder === 'alphabetical' && <div>Create {order} Teams({playerCount} players)</div>}
      </>

      
    </button>
  );
}
