import React from 'react';
import Button from 'react-bootstrap/Button';
import { useRecoilValue } from 'recoil';
import * as state from '@/store';
import { get } from '@/components/common/utils';

export default function DownloadScreenshotButton() {
  const title = get('title');
  const dataUrl = useRecoilValue(state.screenshotUrl);

  function handleClick() {
    var link = document.createElement('a');
    link.download = title + '.jpeg';
    link.href = dataUrl;
    link.click();
  }
  return (
    <>
      <Button variant='custom' size='sm' onClick={handleClick}>
        Download Screenshot
      </Button>
    </>
  );
}
