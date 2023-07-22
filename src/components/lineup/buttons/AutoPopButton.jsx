import React from 'react';
import { useRecoilValue } from 'recoil';
import { useCreateTeam } from '@/components/lineup/hooks';
import * as state from '@/store';
import { setAutoPop } from '@/components/lineup/utils';

export default function AutoPopButton() {
  const createTeam = useCreateTeam();
  const idsInLineup = useRecoilValue(state.idsInLineup);
  const teeTimeCount = useRecoilValue(state.teeTimeCount);
  const playerCount = idsInLineup.length;

  function handleClick() {
    const teeTimes = Number(teeTimeCount);
    const players = Number(playerCount);
    const autoPop = setAutoPop(teeTimes, players);
    createTeam(autoPop);
  }
  return (
    <>
      <br />
      <button onClick={handleClick}>
        Auto Populate ({playerCount} players)
      </button>
      <br />
    </>
  );
}
