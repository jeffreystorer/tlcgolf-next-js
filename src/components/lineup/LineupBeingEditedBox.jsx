'use client';
import { useRecoilValue } from 'recoil';
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

  return (
    <div id='lineup-being-edited' className='titled_outer'>
      <h2>{lineupTitle}</h2>
      {currentLineup ? (
        <CurrentSavedLineup lineupSnapshot={snapshots[currentLineupIndex]} />
      ) : null}
      <GroupAndCourseDropdowns />
      <LineupDropdowns />
      <div className='buttons_stacked'>
        {okToAddPlayers ? <TeesAndPlayersButtons /> : null}
        {okToSave && <ClearPlayersFromTeamsButton />}
      </div>
    </div>
  );
}
