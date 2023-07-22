import React from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import * as state from '@/store';

export default function ShowTeamHcpCheckBox() {
  const [showTeamHcp, setShowTeamHcp] = useRecoilState(state.showTeamHcp);
  const resetDimensionIndex = useResetRecoilState(state.dimensionIndex);

  function handleChange() {
    resetDimensionIndex();
    setShowTeamHcp((prevState) => !prevState);
  }

  return (
    <>
      <input
        type='checkbox'
        id='showTeamHcp'
        onChange={handleChange}
        checked={showTeamHcp}></input>
      <label htmlFor='showTeamHcp'>&nbsp;Show Team Hcp</label>
      <br />
    </>
  );
}
