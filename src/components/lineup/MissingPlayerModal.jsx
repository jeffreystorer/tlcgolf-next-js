'use client';
import { usePathname } from 'next/navigation';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import useLineupService from '@/components/lineup/hooks/useLineupService';
import * as state from '@/store';

export default function MissingPlayerModal() {
  const pathname = usePathname();
  const { deleteLineup } = useLineupService();
  const message = useRecoilValue(state.missingPlayerMessage);
  const resetPlayersInLineup = useResetRecoilState(state.playersInLineup);
  const resetCurrentLineupIndex = useResetRecoilState(state.currentLineupIndex);
  const resetCurrentLineup = useResetRecoilState(state.currentLineup);
  const resetLineupTitle = useResetRecoilState(state.lineupTitle);
  const resetSortOrder = useResetRecoilState(state.sortOrder);
  const currentLineupKey = useRecoilValue(state.currentLineupKey);
  const resetCurrentLineupKey = useResetRecoilState(state.currentLineupKey);

  const clearLineup = () => {
    resetPlayersInLineup();
    resetCurrentLineupIndex();
    resetCurrentLineupKey();
    resetCurrentLineup();
    resetLineupTitle();
    resetSortOrder();
    window.location.href = '/lineup';
  };

  const handleDelete = () => {
    deleteLineup(currentLineupKey);
    clearLineup();
  };

  return (
    <div id='missingplayermodal' className='modal'>
      <a href={pathname} className='modalClose' hidden></a>
      <section>
        <header>
          <h2>Oops!</h2>
          <a href={pathname} className='modalClose' hidden></a>
        </header>
        <div>
          <p>{message}</p>
        </div>
        <footer>
          <button className='not-stacked' onClick={clearLineup}>
            Cancel
          </button>
          <a type='button' href='/edittable'>
            Edit Table
          </a>
          <button className='not-stacked' onClick={handleDelete}>
            Delete
          </button>
        </footer>
      </section>
    </div>
  );
}
