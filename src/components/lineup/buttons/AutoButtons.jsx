import React from 'react';
import { useRecoilValue } from 'recoil';
import { AutoABCDButton, AutoPopButton } from '@/components/lineup/buttons';
import * as state from '@/store';
import { teamTablesEmpty } from '@/components/lineup/utils';

export default function AutoButtonsAndShowTeamHcpCheckBox() {
  const teamTables = useRecoilValue(state.teamTables);
  const teeTimeCount = useRecoilValue(state.teeTimeCount);
  const sortOrder = useRecoilValue(state.sortOrder);
  const idsInLineup = useRecoilValue(state.idsInLineup);
  const idsInLineupCount = idsInLineup.length;
  let showAutoABCDButton = false;
  if (
    sortOrder === 'byHandicap' &&
    Number(teeTimeCount) > 1 &&
    idsInLineupCount > 0 &&
    (idsInLineupCount % 3 === 0 || idsInLineupCount % 4 === 0) &&
    teamTablesEmpty(teamTables)
  ) {
    showAutoABCDButton = true;
  }
  let showAutoPopButton = false;
  if (idsInLineupCount > 0 && teamTablesEmpty(teamTables))
    showAutoPopButton = true;
  return (
    <>
      {showAutoPopButton && <AutoPopButton />}
      {showAutoABCDButton && <AutoABCDButton />}
      <br />
    </>
  );
}
