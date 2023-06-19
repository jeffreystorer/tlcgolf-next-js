import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmDeleteModal({
  allLineups,
  show,
  setShow,
  handleDelete,
}) {
  const handleCancel = () => setShow(false);

  let message = 'Are you sure you want to delete this saved lineup?';
  if (allLineups)
    message = 'Are you sure you want to delete all saved lineups?';

  return (
    <Modal centered show={show} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Heads up!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant='primary' onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
