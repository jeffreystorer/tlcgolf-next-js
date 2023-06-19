import React, { useState, useEffect } from 'react';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { ConfirmDeleteModal } from '@/components/lineup';
import { useLoadSavedLineup } from '@/components/lineup/hooks';
import useLineupService from '@/components/lineup/hooks/useLineupService';
import * as state from '@/store';

export default function CurrentSavedLineup({ lineupSnapshot }) {
  const { deleteLineup } = useLineupService();
  const [modalShow, setModalShow] = useState(false);
  const loadSavedLineup = useLoadSavedLineup();
  const [loading, setLoading] = useState(true);

  const resetPlayersInLineup = useResetRecoilState(state.playersInLineup);
  const resetCurrentLineupIndex = useResetRecoilState(state.currentLineupIndex);
  const resetCurrentLineup = useResetRecoilState(state.currentLineup);
  const resetLineupTitle = useResetRecoilState(state.lineupTitle);
  const resetSortOrder = useResetRecoilState(state.sortOrder);
  const currentLineupKey = useRecoilValue(state.currentLineupKey);
  const resetCurrentLineupKey = useResetRecoilState(state.currentLineupKey);

  useEffect(() => {
    editLineup();
    //eslint-disable-next-line
  }, [lineupSnapshot]);

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

  const exportLineup = () => {
    editLineup();
    setLoading(false);
  };

  const clearLineup = () => {
    resetPlayersInLineup();
    resetCurrentLineupIndex();
    resetCurrentLineupKey();
    resetCurrentLineup();
    resetLineupTitle();
    resetSortOrder();
    window.location.reload();
  };

  const handleDeleteLineup = () => {
    setModalShow(false);
    deleteLineup(currentLineupKey);
    clearLineup();
  };

  const handleShowModal = () => {
    setModalShow(true);
  };

  if (loading) {
    return (
      <>
        <div className='div--center'>
          {lineupSnapshot && (
            <>
              <button className='button stacked' onClick={exportLineup}>
                Export
              </button>
              <button className='button stacked' onClick={clearLineup}>
                Clear
              </button>
              <button className='button stacked' onClick={handleShowModal}>
                Delete
              </button>
              <ConfirmDeleteModal
                allLineups={false}
                show={modalShow}
                setShow={setModalShow}
                handleDelete={handleDeleteLineup}
              />
            </>
          )}
        </div>
      </>
    );
  }

  return <Navigate replace to='/export' />;
}
