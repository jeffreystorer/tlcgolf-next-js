import React from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import * as state from '@/store';

export default function ShowLocalNumbersCheckbox() {
  const [showLocalNumbers, setShowLocalNumbers] = useRecoilState(
    state.showLocalNumbers
  );
  const resetDimensionIndex = useResetRecoilState(state.dimensionIndex);

  function handleChange() {
    resetDimensionIndex();
    setShowLocalNumbers((prevState) => !prevState);
  }

  return (
    <>
      <input
        type='checkbox'
        id='showLocalNumbers'
        onChange={handleChange}
        defaultChecked={showLocalNumbers}></input>
      <label htmlFor='showLocalNumbers'>&nbsp;Show Local Numbers</label>
    </>
  );
}
