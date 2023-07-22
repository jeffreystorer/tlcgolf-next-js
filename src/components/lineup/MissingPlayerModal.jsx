'use client';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import useLineupService from '@/components/lineup/hooks/useLineupService';
import * as state from '@/store';
import { get, set } from '@/components/common/utils';

export default function MissingPlayerModal() {
  const { deleteLineup } = useLineupService();
  const [showMissingPlayerModal, setShowMissingPlayerModal] = useRecoilState(
    state.showMissingPlayerModal
  );
  const message = useRecoilValue(state.missingPlayerMessage);
  const resetPlayersInLineup = useResetRecoilState(state.playersInLineup);
  const resetCurrentLineupIndex = useResetRecoilState(state.currentLineupIndex);
  const resetCurrentLineup = useResetRecoilState(state.currentLineup);
  const resetLineupTitle = useResetRecoilState(state.lineupTitle);
  const resetSortOrder = useResetRecoilState(state.sortOrder);
  const currentLineupKey = useRecoilValue(state.currentLineupKey);
  const resetCurrentLineupKey = useResetRecoilState(state.currentLineupKey);
  const sheetURL = get('sheetURL');

  const clearLineup = () => {
    resetPlayersInLineup();
    resetCurrentLineupIndex();
    resetCurrentLineupKey();
    resetCurrentLineup();
    resetLineupTitle();
    resetSortOrder();
    window.location.reload();
  };

  const handleCancel = () => {
    clearLineup();
    setShowMissingPlayerModal(false);
  };

  const handleEditTable = () => {
    setShowMissingPlayerModal(false);
    set('timeStamp', 1);
    resetPlayersInLineup();
    resetCurrentLineupIndex();
    resetCurrentLineup();
    resetLineupTitle();
    document.location = sheetURL;
  };
  const handleDelete = () => {
    setShowMissingPlayerModal(false);
    deleteLineup(currentLineupKey);
    clearLineup();
  };

  return <></>;
  {
    /* <Modal centered show={showMissingPlayerModal} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Oops!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant='secondary' onClick={handleEditTable}>
          Edit Table
        </Button>
        <Button variant='primary' onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  ); */
  }
}
