'use client';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useGetPlayersInGroup } from '@/components/common/hooks';
import { get } from '@/components/common/utils';
import * as state from '@/store';

export default function useUpdatePlayersInLineup() {
  const getPlayersInGroup = useGetPlayersInGroup();
  const group = get('group');
  const sortOrder = useRecoilValue(state.sortOrder);
  const idsInLineup = useRecoilValue(state.idsInLineup);
  const setPlayersInLineup = useSetRecoilState(state.playersInLineup);
  const notUsed = '';

  function updatePlayersInLineup(teesSelectedCourse) {
    const playersInGroup = getPlayersInGroup(
      'createLineupTable',
      teesSelectedCourse
    );
    let newPlayersInLineupArray = [];
    idsInLineup.forEach((id) => {
      newPlayersInLineupArray.push(
        playersInGroup.find((player) => player.id === Number(id))
      );
    });
    setPlayersInLineup(newPlayersInLineupArray);
  }
  return updatePlayersInLineup;
}
