'use client';
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
      <label>Player Sort Order<br/>(For Creating Teams)</label>
      <br />
      <select value={sortOrder} onChange={handleChange}>
        <option value='byHandicap'>By Course Hcp</option>
        <option value='random'>Random</option>
        <option value='alphabetical'>Alphabetical</option>
      </select>
    </div>
  );
}
