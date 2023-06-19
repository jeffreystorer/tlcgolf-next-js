import { useRecoilValue, useSetRecoilState } from 'recoil';
import { createPlayersArray } from '@/components/common/utils';
import * as state from '@/store';

export default function useUpdatePlayersInLineup() {
  const group = useRecoilValue(state.group);
  const sortOrder = useRecoilValue(state.sortOrder);
  const idsInLineup = useRecoilValue(state.idsInLineup);
  const setPlayersInLineup = useSetRecoilState(state.playersInLineup);
  const notUsed = '';

  function updatePlayersInLineup(course, teesSelected) {
    const playersInGroup = createPlayersArray(
      'createLineupTable',
      notUsed,
      notUsed,
      course,
      group,
      teesSelected,
      notUsed,
      notUsed,
      sortOrder
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
