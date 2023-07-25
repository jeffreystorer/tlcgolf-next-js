import React from 'react';
import {
  PlayingDateDropdown,
  TeeTimeCountDropdown,
  LinkTimeDropdown,
  Progs069Dropdown,
  ProgAdjDropdown,
} from '@/components/lineup/dropdowns';

export default function LineupDropdowns() {
  return (
    <>
      <div className='select-dropdown-container'>
        <PlayingDateDropdown />
        <TeeTimeCountDropdown />
      </div>
      <div className='select-dropdown-container'>
        <LinkTimeDropdown />
      </div>
      <div className='select-dropdown-container'>
        <Progs069Dropdown />
        <ProgAdjDropdown />
      </div>
    </>
  );
}
