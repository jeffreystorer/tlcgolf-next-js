import React from 'react';
import { useSetRecoilState } from 'recoil';
import * as state from '@/store';

export default function ChangeTeesButton() {
  const setShowChangeTees = useSetRecoilState(state.showChangeTees);

  function handleClick(event) {
    event.preventDefault();
    setShowChangeTees(true);
  }

  return (
    <button className='stacked' onClick={handleClick}>
      Change Tees
    </button>
  );
}
