import React from 'react';
import { useRecoilValue } from 'recoil';
import { useCreateTeam } from '@/components/lineup/hooks';
import * as state from '@/store';
import { setAutoABCD } from '@/components/lineup/utils';

export default function AutoPopButton() {
  const createTeam = useCreateTeam();
  const idsInLineup = useRecoilValue(state.idsInLineup);
  const teeTimeCount = useRecoilValue(state.teeTimeCount);

  const playerCount = idsInLineup.length;

  function handleClick() {
    const teeTimes = Number(teeTimeCount);
    const players = Number(playerCount);
    const autoABCD = setAutoABCD(teeTimes, players);
    createTeam(autoABCD);
  }
  return (
    <>
      <br />
      <button className='button' onClick={handleClick}>
        Auto ABCD ({playerCount} players)
      </button>
      <br />
    </>
  );
}
