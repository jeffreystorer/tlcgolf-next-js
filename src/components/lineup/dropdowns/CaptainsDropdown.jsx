'use client';
import React from 'react';
import {
  useRecoilState,
  useResetRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { get, set } from '@/components/common/utils';
import * as state from '@/store';

export default function CaptainsDropdown({ snapshots }) {
  const resetCurrentLineup = useResetRecoilState(state.currentLineup);
  const resetCurrentLineupKey = useResetRecoilState(state.currentLineupKey);
  const resetCurrentLineupIndex = useResetRecoilState(state.currentLineupIndex);
  const resetPlayersInLineup = useResetRecoilState(state.playersInLineup);
  const resetLineupTitle = useResetRecoilState(state.lineupTitle);
  const resetSortOrder = useResetRecoilState(state.sortOrder);
  const resetPlayingDate = useResetRecoilState(state.playingDate);
  const resetTeeTimeCount = useResetRecoilState(state.teeTimeCount);
  const resetLinkTime = useResetRecoilState(state.linkTime);
  const resetProgs069 = useResetRecoilState(state.progs069);
  const resetProgAdj = useResetRecoilState(state.progAdj);
  const [captainGhinNumber, setCaptainGhinNumber] = useRecoilState(
    state.captainGhinNumber
  );
  const realGhinNumber = useRecoilValue(state.realGhinNumber);
  const captains = useRecoilValue(state.captains);
  const setNextLineupIndex = useSetRecoilState(state.nextLineupIndex);

  function handleCaptainChange(e) {
    resetPlayersInLineup();
    resetCurrentLineupIndex();
    resetCurrentLineupKey();
    resetCurrentLineup();
    resetLineupTitle();
    resetSortOrder();
    resetPlayingDate();
    resetTeeTimeCount();
    resetLinkTime();
    resetProgs069();
    resetProgAdj();

    //if we are on the Storer page, save the next lineup index
    if (captainGhinNumber === realGhinNumber)
      setNextLineupIndex(snapshots.length);
    setCaptainGhinNumber(e.target.value);
  }

  let optionItems;
  try {
    optionItems = captains.map((captain) => (
      <option key={captain.ghinNumber} value={captain.ghinNumber}>
        {captain.lastName}
      </option>
    ));
  } catch (error) {
    console.log(error);
  }

  return (
    <div className='select-dropdown-container'>
      <select
        id='captains'
        value={captainGhinNumber}
        onChange={handleCaptainChange}>
        {optionItems}
      </select>
    </div>
  );
}
