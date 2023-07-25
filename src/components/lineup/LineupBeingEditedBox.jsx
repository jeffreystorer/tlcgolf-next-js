import React from 'react';
import { useRecoilValue } from 'recoil';
import { GroupAndCourseDropdowns, TitledBox } from '@/components/common';
import {
  AddDeletePlayersInLineup,
  CurrentSavedLineup,
  ChangeTees,
} from '@/components/lineup';
import {
  AddDeletePlayersButton,
  ChangeTeesButton,
  ClearPlayersFromTeamsButton,
  WednesdayButton,
} from '@/components/lineup/buttons';
import { LineupDropdowns } from '@/components/lineup/dropdowns';
import * as state from '@/store';

export default function LineupBeingEditedBox({ snapshots }) {
  const lineupTitle = useRecoilValue(state.lineupTitle);
  const showAddDeletePlayersButton = useRecoilValue(
    state.showAddDeletePlayersButton
  );
  const showAddDeletePlayers = useRecoilValue(state.showAddDeletePlayers);
  const showChangeTees = useRecoilValue(state.showChangeTees);
  const currentLineup = useRecoilValue(state.currentLineup);
  const currentLineupIndex = useRecoilValue(state.currentLineupIndex);
  const okToSave = useRecoilValue(state.okToSave);
  const okToAddPlayers = useRecoilValue(state.okToAddPlayers);

  const TeesAndPlayersButtons = () => {
    return (
      <>
        <WednesdayButton />
        {showChangeTees && <ChangeTees />}
        {!showChangeTees && (
          <>
            <ChangeTeesButton />
            <br />
          </>
        )}
        {showAddDeletePlayersButton && (
          <>
            {' '}
            <AddDeletePlayersButton />
            <br />
          </>
        )}
        {showAddDeletePlayers && <AddDeletePlayersInLineup />}
      </>
    );
  };

  return (
    <>
      <TitledBox title={lineupTitle}>
        <div id='lineupbeingedited'>
          {currentLineup ? (
            <CurrentSavedLineup
              lineupSnapshot={snapshots[currentLineupIndex]}
            />
          ) : null}
          <GroupAndCourseDropdowns />
          <LineupDropdowns />
          {okToAddPlayers ? <TeesAndPlayersButtons /> : null}
          {okToSave && <ClearPlayersFromTeamsButton />}
        </div>
      </TitledBox>
    </>
  );
}
