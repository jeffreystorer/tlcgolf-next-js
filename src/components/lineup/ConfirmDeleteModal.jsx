'use client';
import { usePathname } from 'next/navigation';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import useLineupService from '@/components/lineup/hooks/useLineupService';
import * as state from '@/store';

export default function ConfirmDeleteModal() {
  const pathname = usePathname();
  const { deleteAllLineups } = useLineupService();
  const { deleteLineup } = useLineupService();
  const deleteAll = useRecoilValue(state.deleteAll);
  const currentLineupKey = useRecoilValue(state.currentLineupKey);
  const resetCurrentLineupIndex = useResetRecoilState(state.currentLineupIndex);
  const resetCurrentLineupKey = useResetRecoilState(state.currentLineupKey);
  const resetCurrentLineup = useResetRecoilState(state.currentLineup);
  const resetPlayersInLineup = useResetRecoilState(state.playersInLineup);
  const resetLineupTitle = useResetRecoilState(state.lineupTitle);
  const resetSortOrder = useResetRecoilState(state.sortOrder);
  const resetTeamTables = useResetRecoilState(state.teamTables);
  const resetShowAddTeamMember = useResetRecoilState(state.showAddTeamMember);
  const resetTextareaValue = useResetRecoilState(state.textareaValue);

  const handleDeleteAll = () => {
    deleteAllLineups();
    clearLineup();
  };

  const handleDeleteLineup = () => {
    deleteLineup(currentLineupKey);
    clearLineup();
  };

  const clearLineup = () => {
    resetPlayersInLineup();
    resetCurrentLineupIndex();
    resetCurrentLineupKey();
    resetCurrentLineup();
    resetLineupTitle();
    resetSortOrder();
    resetTeamTables();
    resetShowAddTeamMember();
    resetTextareaValue();
    window.location.href = '/lineup';
  };

  return (
    <div id='confirmdeletemodal' className='modal'>
      <a href={pathname} className='modalClose' hidden></a>
      <section>
        <header>
          <h2>Heads up!</h2>
          <a href={pathname} className='modalClose' hidden></a>
        </header>
        {deleteAll ? (
          <p>Are you sure you want to delete all Lineups?</p>
        ) : (
          <p>Are you sure you want to delete this Lineup?</p>
        )}
        <footer>
          <a type='button' className='not-stacked modalClose' href={pathname}>
            Cancel
          </a>
          {deleteAll ? (
            <button className='not-stacked' onClick={handleDeleteAll}>
              Delete All
            </button>
          ) : (
            <button className='not-stacked' onClick={handleDeleteLineup}>
              Delete
            </button>
          )}
        </footer>
      </section>
    </div>
  );
}
