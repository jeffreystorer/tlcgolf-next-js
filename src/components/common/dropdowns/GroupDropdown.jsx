'use client';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { get, set } from '@/components/common/utils';
import * as state from '@/store';

export default function GroupDropdown() {
  const [group, setGroup] = useRecoilState(state.group);
  const resetPlayersInLineup = useResetRecoilState(state.playersInLineup);
  const resetCurrentLineupIndex = useResetRecoilState(state.currentLineupIndex);
  const resetCurrentLineup = useResetRecoilState(state.currentLineup);
  const resetLineupTitle = useResetRecoilState(state.lineupTitle);
  let groups = get('groups');

  function handleGroupChange(e) {
    setGroup((prev) => e.target.value);
    set('group', e.target.value);
    resetPlayersInLineup();
    resetCurrentLineupIndex();
    resetCurrentLineup();
    resetLineupTitle();
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
    <select value={group} onChange={handleGroupChange}>
      <option key={'0'} value=''>
        Select Group
      </option>
      {optionItems}
    </select>
  );
}
