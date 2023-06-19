import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { ConfirmDeleteModal, MissingPlayerModal } from '@/components/lineup';
import useLineupService from '@/components/lineup/hooks/useLineupService';
import * as state from '@/store';

const SavedLineups = ({ snapshots }) => {
  const { deleteAllLineups } = useLineupService();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const setCurrentLineup = useSetRecoilState(state.currentLineup);
  const resetCurrentLineup = useResetRecoilState(state.currentLineup);
  const setCurrentLineupKey = useSetRecoilState(state.currentLineupKey);
  const resetCurrentLineupKey = useResetRecoilState(state.currentLineupKey);
  const [currentLineupIndex, setCurrentLineupIndex] = useRecoilState(
    state.currentLineupIndex
  );
  const resetCurrentLineupIndex = useResetRecoilState(state.currentLineupIndex);

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

  const handleClickDeleteAll = () => {
    setShowConfirmDeleteModal(false);
    deleteAllLineups();
    resetCurrentLineupIndex();
    resetCurrentLineupKey();
    resetCurrentLineup();
    window.location.reload();
  };

  const handleShowConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(true);
  };

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
          <button
            className='button stacked'
            onClick={handleShowConfirmDeleteModal}>
            Delete All
          </button>
          <ConfirmDeleteModal
            allLineups={true}
            show={showConfirmDeleteModal}
            setShow={setShowConfirmDeleteModal}
            handleDelete={handleClickDeleteAll}
          />
          <MissingPlayerModal />
        </>
      )}
    </>
  );
};

export default SavedLineups;
