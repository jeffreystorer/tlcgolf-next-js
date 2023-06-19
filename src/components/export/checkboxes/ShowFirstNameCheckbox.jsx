import React from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import * as state from '@/store';

export default function ShowFirstNameCheckbox() {
  const [showFirstName, setShowFirstName] = useRecoilState(state.showFirstName);
  const resetDimensionIndex = useResetRecoilState(state.dimensionIndex);

  function handleChange() {
    resetDimensionIndex();
    setShowFirstName((prevState) => !prevState);
  }

  return (
    <>
      <input
        type='checkbox'
        id='showFirstName'
        onChange={handleChange}
        defaultChecked={showFirstName}></input>
      <label htmlFor='showFirstName'>&nbsp;Show First Name</label>
    </>
  );
}
