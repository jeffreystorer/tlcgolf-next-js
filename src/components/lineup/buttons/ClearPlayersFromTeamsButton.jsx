'use client';
import React from 'react';
import { useResetRecoilState } from 'recoil';
import * as state from '@/store';

export default function ClearPlayersFromTeamsButton() {
  const resetTeamTables = useResetRecoilState(state.teamTables);
  const resetShowAddTeamMember = useResetRecoilState(state.showAddTeamMember);

  function handleClick() {
    resetTeamTables();
    resetShowAddTeamMember();
  }
  return (
    <button className='stacked' onClick={handleClick}>
      Clear Players from Teams
    </button>
  );
}
