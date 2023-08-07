'use client';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useCreateTeam } from '@/components/lineup/hooks';
import * as state from '@/store';
import { setAutoABCD } from '@/components/lineup/utils';

export default function AutoPopButton() {
  const createTeam = useCreateTeam();
  const idsInLineup = useRecoilValue(state.idsInLineup);
  const teeTimeCount = useRecoilValue(state.teeTimeCount);
  const setShowAddDeletePlayers = useSetRecoilState(state.showAddDeletePlayers);
  const setShowAddDeletePlayersButton = useSetRecoilState(
    state.showAddDeletePlayersButton
  );

  const playerCount = idsInLineup.length;

  function handleClick() {
    const teeTimes = Number(teeTimeCount);
    const players = Number(playerCount);
    const autoABCD = setAutoABCD(teeTimes, players);
    setShowAddDeletePlayers(false);
    setShowAddDeletePlayersButton(true);
    createTeam(autoABCD);
  }
  return (
    <button className='stacked' onClick={handleClick}>
      Auto ABCD ({playerCount} players)
    </button>
  );
}
