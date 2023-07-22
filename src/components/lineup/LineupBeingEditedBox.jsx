import React from 'react';
import { useRecoilValue } from 'recoil';
import { GroupAndCourseDropdowns, TitledBox } from '@/components/common';
import {
  AddDeletePlayersInLineup,
  CurrentSavedLineup,
  SelectTees,
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
  const showSelectTees = useRecoilValue(state.showSelectTees);
  const currentLineup = useRecoilValue(state.currentLineup);
  const currentLineupIndex = useRecoilValue(state.currentLineupIndex);
  const okToSave = useRecoilValue(state.okToSave);
  const okToAddPlayers = useRecoilValue(state.okToAddPlayers);

  const TeesAndPlayersButtons = () => {
    return (
      <>
        <WednesdayButton />
        {showSelectTees && <SelectTees />}
        {!showSelectTees && <ChangeTeesButton />}
        {showAddDeletePlayersButton && <AddDeletePlayersButton />}
        {showAddDeletePlayers && <AddDeletePlayersInLineup />}
      </>
    );
  };

  return (
    <>
      <TitledBox title={lineupTitle}>
        <>
          {currentLineup ? (
            <CurrentSavedLineup
              lineupSnapshot={snapshots[currentLineupIndex]}
            />
          ) : null}
          <GroupAndCourseDropdowns />
          <br />
          <LineupDropdowns />
          <br />
          {okToAddPlayers ? <TeesAndPlayersButtons /> : null}
          {okToSave && (
            <>
              <br />
              <ClearPlayersFromTeamsButton />
            </>
          )}
        </>
      </TitledBox>
    </>
  );
}
