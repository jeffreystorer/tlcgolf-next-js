import React from 'react';
import Button from 'react-bootstrap/Button';
import { useRecoilValue } from 'recoil';
import * as state from '@/store';
import { copyImageToClipboard } from '@/components/export/utils';

export default function CopyLineupToClipboard() {
  const jpgImage = useRecoilValue(state.jpgImage);

  function handleClick() {
    copyImageToClipboard(jpgImage);
  }

  return (
    <>
      <Button variant='custom' size='sm' onClick={handleClick}>
        Copy Lineup to Clipboard
      </Button>
      <br />
    </>
  );
}
