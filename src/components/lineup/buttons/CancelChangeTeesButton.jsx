import React from 'react';
import { useSetRecoilState } from 'recoil';
import * as state from '@/store';

export default function CancelChangeTeesButton() {
  const setShowChangeTees = useSetRecoilState(state.showChangeTees);
  function handleClick() {
    setShowChangeTees(false);
  }

  return <button onClick={handleClick}>Cancel</button>;
}
