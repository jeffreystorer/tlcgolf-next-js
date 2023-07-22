import React from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import * as state from '@/store';

export default function ShowIndvidualHandicapsCheckbox() {
  const [showIndividualHandicaps, setShowIndividualHandicaps] = useRecoilState(
    state.showIndividualHandicaps
  );
  const resetDimensionIndex = useResetRecoilState(state.dimensionIndex);

  function handleChange() {
    resetDimensionIndex();
    setShowIndividualHandicaps((prevState) => !prevState);
  }

  return (
    <>
      <input
        type='checkbox'
        id='showIndividualHandicaps'
        onChange={handleChange}
        defaultChecked={showIndividualHandicaps}></input>
      <label htmlFor='showIndividualHandicaps'>
        &nbsp;Show Individual Handicaps
      </label>
    </>
  );
}
