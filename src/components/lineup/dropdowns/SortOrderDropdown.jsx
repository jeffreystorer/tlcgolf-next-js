import React from 'react';
import { useRecoilState } from 'recoil';
import { useHandleSortPlayersInLineup } from '@/components/lineup/hooks';
import * as state from '@/store';

export default function SortOrderDropdown() {
  const [sortOrder, setSortOrder] = useRecoilState(state.sortOrder);
  const handleSort = useHandleSortPlayersInLineup();

  function handleChange(event) {
    setSortOrder(event.target.value);
    handleSort(event.target.value);
  }

  return (
    <div id='sort-order'>
      <label>Sort Order:</label>
      <br />
      <select value={sortOrder} onChange={handleChange}>
        <option value='alphabetical'>Alphabetical</option>
        <option value='byHandicap'>By Handicap</option>
        <option value='random'>Random</option>
      </select>
    </div>
  );
}
