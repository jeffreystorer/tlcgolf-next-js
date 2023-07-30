'use client';
import { useRecoilValue } from 'recoil';
import { useGetPlayersInGroup } from '@/components/common/hooks';
import { get } from '@/components/common/utils';
import * as state from '@/store';

export default function usePlayersNotInLineup() {
  const teesSelected = get('teesSelected');
  const course = get('course');
  const getPlayersInGroup = useGetPlayersInGroup();
  const playersInGroup = getPlayersInGroup(
    'createLineupTable',
    teesSelected[course]
  );
  const idsInLineup = useRecoilValue(state.idsInLineup);

  function playersNotInLineup() {
    let playersNotInLineupArray = [];

    playersInGroup.forEach((player) => {
      if (idsInLineup.includes(player.id.toString()) === false) {
        playersNotInLineupArray.push(player);
      }
    });
    return playersNotInLineupArray;
  }
  return playersNotInLineup;
}
