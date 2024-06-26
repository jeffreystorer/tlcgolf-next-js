'use client';
import { useState, useEffect } from 'react';
import { useResetRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { ConfirmDeleteModal } from '@/components/lineup';
import { useLoadSavedLineup } from '@/components/lineup/hooks';
import useLineupService from '@/components/lineup/hooks/useLineupService';
import * as state from '@/store';

export default function CurrentSavedLineup({ lineupSnapshot }) {
  const router = useRouter();
  const loadSavedLineup = useLoadSavedLineup();
  const [loading, setLoading] = useState(true);
  //const currentLineupKey = useRecoilValue(state.currentLineupKey);
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
  const setDeleteAll = useSetRecoilState(state.deleteAll);
  const resetTeamTables = useResetRecoilState(state.teamTables);
  const resetShowAddTeamMember = useResetRecoilState(state.showAddTeamMember);
  const resetTextareaValue = useResetRecoilState(state.textareaValue);

  const editLineup = () => {
    resetSortOrder();
    try {
      let aLineup = lineupSnapshot.val();
      let title = aLineup.title;
      let savedLineup = aLineup.lineup;
      savedLineup.title = title;
      loadSavedLineup(savedLineup);
    } catch (error) {
      console.log('error loading lineup from firebase', error);
    }
  };

  useEffect(() => {
    editLineup();
    //eslint-disable-next-line
  }, [lineupSnapshot]);

  const exportLineup = () => {
    editLineup();
    setLoading(false);
    router.push('/export');
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
    resetTextareaValue();
    //window.location.reload();
  };

  function handleDelete(e) {
    e.preventDefault;
    setDeleteAll(false);
    window.location.href = '#confirmdeletemodal';
  }

  if (loading) {
    return (
      <>
        {lineupSnapshot && (
          <div className='buttons'>
            <button className='stacked' onClick={exportLineup}>
              Export
            </button>
            <button className='stacked' onClick={clearLineup}>
              Clear
            </button>
            <button type='button' onClick={handleDelete}>
              Delete
            </button>
            <ConfirmDeleteModal />
          </div>
        )}
      </>
    );
  }
  return false;
}
