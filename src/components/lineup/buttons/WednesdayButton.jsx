'use client';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useGetPlayersInGroup } from '@/components/common/hooks';
import * as state from '@/store';
import { get } from '@/components/common/utils';

export default function WednesdayButton() {
  const course = useRecoilValue(state.course);
  const group = useRecoilValue(state.group);
  const teesSelected = useRecoilValue(state.teesSelected);
  const setPlayersInLineup = useSetRecoilState(state.playersInLineup);
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
