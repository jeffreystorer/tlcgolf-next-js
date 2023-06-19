import React from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { get } from '@/components/common/utils';
import * as state from '@/store';

export default function GroupDropdown() {
  const [group, setGroup] = useRecoilState(state.group);
  const resetPlayersInLineup = useResetRecoilState(state.playersInLineup);
  const resetCurrentLineupIndex = useResetRecoilState(state.currentLineupIndex);
  const resetCurrentLineup = useResetRecoilState(state.currentLineup);
  const resetLineupTitle = useResetRecoilState(state.lineupTitle);
  let groups = get('groups');

  function handleGroupChange(e) {
    setGroup(e.target.value);
    resetPlayersInLineup();
    resetCurrentLineupIndex();
    resetCurrentLineup();
    resetLineupTitle();
    window.location.reload();
  }

  if (groups.slice(-1) === 'Walk') groups.pop();
  if (groups.length === 2) groups.shift();

  let optionItems;
  try {
    optionItems = groups.map((group) => (
      <option key={group} value={group}>
        {group}
      </option>
    ));
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <label className='selector_left'>
        <select value={group} onChange={handleGroupChange}>
          <option key={'0'} value=''>
            Select Group
          </option>
          {optionItems}
        </select>
      </label>
    </>
  );
}
