import React from 'react';
import { useRecoilValue } from 'recoil';
import * as state from '@/store';
import { copyImageToClipboard } from '@/components/export/utils';

export default function CopyLineupToClipboard() {
  const jpgImage = useRecoilValue(state.jpgImage);

  function handleClick() {
    copyImageToClipboard(jpgImage);
  }

  return (
    <button onClick={handleClick} className='stacked'>
      Copy Lineup to Clipboard
    </button>
  );
}
