import React, { useEffect, useRef } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import Image from 'next/image';
import * as state from '@/store';

export default function LineupImage() {
  const jpgImageRef = useRef(null);
  const setJPGImage = useSetRecoilState(state.jpgImage);
  const dataUrl = useRecoilValue(state.screenshotUrl);

  useEffect(() => {
    setJPGImage(jpgImageRef.current);
  }, [setJPGImage]);

  return (
    <>
      <h1>PLEASE IGNORE THE IMAGE BELOW.</h1>
      <h1>IT IS USED FOR COPYING TO THE CLIPBOARD.</h1>
      <div ref={jpgImageRef} id='lineupToCopy'>
        <Image
          src={dataUrl}
          className='img'
          width={500}
          height={500}
          alt='Loading Lineup to Copy . . . '
        />
      </div>
    </>
  );
}
