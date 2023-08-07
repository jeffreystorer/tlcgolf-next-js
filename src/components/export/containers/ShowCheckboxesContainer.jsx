import React from 'react';
import { useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { get } from '@/components/common/utils';
import * as state from '@/store';

export default function ShowCheckboxesContainer() {
  const lineup = get('lineup');
  const progs069 = lineup.progs069;
  const [showFirstName, setShowFirstName] = useRecoilState(state.showFirstName);
  const [showTeamHcp, setShowTeamHcp] = useRecoilState(state.showTeamHcp);
  const [showIndividualHandicaps, setShowIndividualHandicaps] = useRecoilState(
    state.showIndividualHandicaps
  );
  const [showLocalNumbers, setShowLocalNumbers] = useRecoilState(
    state.showLocalNumbers
  );
  const resetDimensionIndex = useResetRecoilState(state.dimensionIndex);

  function handleShowFirstNameChange() {
    resetDimensionIndex();
    setShowFirstName((prevState) => !prevState);
  }

  function handleShowTeamHandicapChange() {
    resetDimensionIndex();
    setShowTeamHcp((prevState) => !prevState);
  }

  function handleShowIndividualHandicapsChange() {
    resetDimensionIndex();
    setShowIndividualHandicaps((prevState) => !prevState);
  }

  function handleShowLocalNumbersChange() {
    resetDimensionIndex();
    setShowLocalNumbers((prevState) => !prevState);
  }

  return (
    <div id='showcheckboxes-container'>
      <label>
        <input
          type='checkbox'
          onChange={handleShowFirstNameChange}
          defaultChecked={showFirstName}
        />
        Show First Name
      </label>
      {progs069 < 1 && showIndividualHandicaps && (
        <label>
          <input
            type='checkbox'
            id='showTeamHcp'
            onChange={handleShowTeamHandicapChange}
            checked={showTeamHcp}
          />
          Show Team Hcp
        </label>
      )}
      <label>
        <input
          type='checkbox'
          id='showIndividualHandicaps'
          onChange={handleShowIndividualHandicapsChange}
          defaultChecked={showIndividualHandicaps}
        />
        Show Individual Handicaps
      </label>
      <label>
        <input
          type='checkbox'
          id='showLocalNumbers'
          onChange={handleShowLocalNumbersChange}
          defaultChecked={showLocalNumbers}
        />
        Show Local Numbers
      </label>
    </div>
  );
}
