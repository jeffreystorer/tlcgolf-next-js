import { useState, useEffect } from 'react';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import { ConfirmDeleteModal } from '@/components/lineup';
import { useLoadSavedLineup } from '@/components/lineup/hooks';
import useLineupService from '@/components/lineup/hooks/useLineupService';
import * as state from '@/store';

export default function CurrentSavedLineup({ lineupSnapshot }) {
  const router = useRouter();
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
              <a type='button' href='#confirmdeletemodal'>
                Delete
              </a>
              {/*
              <button className='button stacked' onClick={handleShowModal}>
                Delete
              </button>
              <ConfirmDeleteModal
                allLineups={false}
                show={modalShow}
                setShow={setModalShow}
                handleDelete={handleDeleteLineup}
              /> */}
            </>
          )}
        </div>
      </>
    );
  }
  return false;
}
