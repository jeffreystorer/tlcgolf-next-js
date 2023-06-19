import React from 'react';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { TeamTable } from '@/components/lineup';
import * as state from '@/store';

export default function useGenerateTeamTables() {
  const teeTimeCount = useRecoilValue(state.teeTimeCount);
  const teamTables = useRecoilValue(state.teamTables);
  let TeamTables = [];
  let teamMembers = [];

  function generateTeamTables() {
    for (var i = 0; i < teeTimeCount; i++) {
      let teamName = 'team' + i;
      teamMembers = teamTables[teamName];
      TeamTables[i] = (
        <TeamTable key={uuidv4()} teamNumber={i} teamMembers={teamMembers} />
      );
    }
    return TeamTables;
  }
  return generateTeamTables;
}
