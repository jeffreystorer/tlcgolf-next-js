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
    <div id='showcheckboxes-container' className='titled_outer'>
      <h2>Display Options</h2>
      
      <label className='toggle'>
            <input
              className='toggle-checkbox'
              type='checkbox'
              id='showFirstName'
              onChange={handleShowFirstNameChange}
              defaultChecked={showFirstName}
            />
            <div className='toggle-switch'></div>
            <span className='toggle-label'>First Name</span>
          </label>
          
      {progs069 < 1 && showIndividualHandicaps && ( 
        <label className='toggle'>
            <input
              className='toggle-checkbox'
              type='checkbox'
              id='showTeamHcp'
              onChange={handleShowTeamHandicapChange}
              checked={showTeamHcp}
            />
            <div className='toggle-switch'></div>
            <span className='toggle-label'>Team Handicap</span>
          </label>
      )}
         
          <label className='toggle'>
            <input
              className='toggle-checkbox'
              type='checkbox'
              id='showIndividualHandicaps'
              onChange={handleShowIndividualHandicapsChange}
              defaultChecked={showIndividualHandicaps}
            />
            <div className='toggle-switch'></div>
            <span className='toggle-label'>Individual Handicaps</span>
          </label>
          <label className='toggle'>
            <input
              className='toggle-checkbox'
              type='checkbox'
              onChange={handleShowLocalNumbersChange}
              defaultChecked={showLocalNumbers}
            />
            <div className='toggle-switch'></div>
            <span className='toggle-label'>Local Numbers</span>
          </label>
    </div>
  );
}
