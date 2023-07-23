import React from 'react';
import { useSetRecoilState } from 'recoil';
import * as state from '@/store';

export default function ChangeTeesButton() {
  const setShowSelectTees = useSetRecoilState(state.showSelectTees);

  function handleClick(event) {
    event.preventDefault();
    setShowSelectTees(true);
  }

  return (
    <>
      <button
        id='handleChangeTeesSelected'
        className='stacked'
        onClick={handleClick}>
        Change Tees
      </button>
      <br />
    </>
  );
}
