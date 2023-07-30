'use client';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useGetPlayersInGroup } from '@/components/common/hooks';
import * as state from '@/store';
import { get } from '@/components/common/utils';

export default function WednesdayButton() {
  const group = get('group');
  const setPlayersInLineup = useSetRecoilState(state.playersInLineup);
  const teesSelected = get('teesSelected');
  const course = get('course');
  const getPlayersInGroup = useGetPlayersInGroup();
  const playersInGroup = getPlayersInGroup(
    'createLineupTable',
    teesSelected[course]
  );
  const newIdsInLineup = useRecoilValue(state.wednesdaySchedules);

  function handleClick(e) {
    e.preventDefault();
    let newPlayersInLineupArray = [];
    newIdsInLineup.forEach((id) => {
      newPlayersInLineupArray.push(
        playersInGroup.find((player) => player.id === Number(id))
      );
    });
    setPlayersInLineup(newPlayersInLineupArray);
  }

  return (
    <button className='stacked' onClick={handleClick}>
      Fetch Wednesday Players
    </button>
  );
}
