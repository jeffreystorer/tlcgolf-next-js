'use client';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import { GroupAndCourseDropdowns } from '@/components/common';
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
import { get } from '@/components/common/utils';
import * as state from '@/store';

export default function LineupBeingEditedBox({ snapshots }) {
  const playersInLineup = useRecoilValue(state.playersInLineup);
  const linkTime = useRecoilValue(state.linkTime);
  const resetPlayersInLineup = useResetRecoilState(state.playersInLineup);
  const resetCurrentLineupIndex = useResetRecoilState(state.currentLineupIndex);
  const resetCurrentLineup = useResetRecoilState(state.currentLineup);
  const resetLineupTitle = useResetRecoilState(state.lineupTitle);
  const resetSortOrder = useResetRecoilState(state.sortOrder);
  const resetPlayingDate = useResetRecoilState(state.playingDate);
  const resetTeeTimeCount = useResetRecoilState(state.teeTimeCount);
  const resetLinkTime = useResetRecoilState(state.linkTime);
  const resetProgs069 = useResetRecoilState(state.progs069);
  const resetProgAdj = useResetRecoilState(state.progAdj);
  const resetCurrentLineupKey = useResetRecoilState(state.currentLineupKey);
  const resetTeamTables = useResetRecoilState(state.teamTables);
  const resetShowAddTeamMember = useResetRecoilState(state.showAddTeamMember);
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
  const ghinNumber = get('ghinNumber');
  const group = useRecoilValue(state.group);

  const TeesAndPlayersButtons = () => {
    return (
      <>
        {ghinNumber === '585871' && group === 'Wednesday' && (
          <WednesdayButton />
        )}
        {!showChangeTees && <ChangeTeesButton />}
        {showChangeTees && <ChangeTees />}
        {showAddDeletePlayersButton && <AddDeletePlayersButton />}
        {showAddDeletePlayers && <AddDeletePlayersInLineup />}
      </>
    );
  };
  const clearLineup = () => {
    resetPlayersInLineup();
    resetCurrentLineupIndex();
    resetCurrentLineupKey();
    resetCurrentLineup();
    resetLineupTitle();
    resetSortOrder();
    resetPlayingDate();
    resetTeeTimeCount();
    resetLinkTime();
    resetProgs069();
    resetProgAdj();
    resetTeamTables();
    resetShowAddTeamMember();
  };

  return (
    <div id='lineup-being-edited' className='titled_outer'>
      <h2>{lineupTitle}</h2>
      {currentLineup ? (
        <CurrentSavedLineup lineupSnapshot={snapshots[currentLineupIndex]} />
      ) : null}
      {!currentLineup &&
        playersInLineup.length > 0 &&
        linkTime !== 'Set Link Time Above' && (
          <button className='stacked' onClick={clearLineup}>
            Clear
          </button>
        )}
      <GroupAndCourseDropdowns />
      <LineupDropdowns />
      <div className='buttons_stacked'>
        {okToAddPlayers ? <TeesAndPlayersButtons /> : null}
        {okToSave && <ClearPlayersFromTeamsButton />}
      </div>
    </div>
  );
}
