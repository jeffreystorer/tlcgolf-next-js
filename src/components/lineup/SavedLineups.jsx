import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ConfirmDeleteModal, MissingPlayerModal } from '@/components/lineup';
import useLineupService from '@/components/lineup/hooks/useLineupService';
import * as state from '@/store';

const SavedLineups = ({ snapshots }) => {
  const setCurrentLineup = useSetRecoilState(state.currentLineup);
  const setCurrentLineupKey = useSetRecoilState(state.currentLineupKey);
  const [currentLineupIndex, setCurrentLineupIndex] = useRecoilState(
    state.currentLineupIndex
  );
  const setDeleteAll = useSetRecoilState(state.deleteAll);

  useEffect(() => {
    if (currentLineupIndex > -1) {
      const lineupSnapshot = snapshots[currentLineupIndex];
      setCurrentLineupKey(lineupSnapshot.key);
      const { title } = lineupSnapshot.val();
      setCurrentLineup({
        key: lineupSnapshot.key,
        title,
      });
    }
    //eslint-disable-next-line
  }, [snapshots]);

  function handleClick(lineupSnapshot, index) {
    setCurrentLineupKey(lineupSnapshot.key);
    setCurrentLineupIndex(index);
    const { title } = lineupSnapshot.val();
    setCurrentLineup({
      key: lineupSnapshot.key,
      title,
    });
  }

  function handleDeleteAll(e) {
    e.preventDefault;
    setDeleteAll(true);
    window.location.href = '#confirmdeletemodal';
  }

  return (
    <>
      {snapshots && (
        <>
          <span className='paragraph--center'>
            Click on a lineup to edit, export, or delete
          </span>
          <ul className='list--text-align-left'>
            {snapshots.map((snapshot, index) => (
              <li
                className={index === currentLineupIndex ? 'active_li' : 'li'}
                onClick={() => handleClick(snapshot, index)}
                key={index}>
                {snapshot.val().title}
              </li>
            ))}
          </ul>
          <button type='button' onClick={handleDeleteAll}>
            Delete All
          </button>

          <ConfirmDeleteModal />
          <MissingPlayerModal />
        </>
      )}
    </>
  );
};

export default SavedLineups;
