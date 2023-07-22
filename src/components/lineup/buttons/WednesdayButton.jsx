import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import * as state from '@/store';
import { get } from '@/components/common/utils';

export default function WednesdayButton() {
  const group = useRecoilValue(state.group);
  const setPlayersInLineup = useSetRecoilState(state.playersInLineup);
  const playersInGroup = useRecoilValue(state.playersInGroup);

  function handleClick(e) {
    e.preventDefault();
    const newIdsInLineup = get('wednesdaySchedules');
    let newPlayersInLineupArray = [];
    newIdsInLineup.forEach((id) => {
      newPlayersInLineupArray.push(
        playersInGroup.find((player) => player.id === Number(id))
      );
    });
    setPlayersInLineup(newPlayersInLineupArray);
  }

  return (
    <>
      {get('ghinNumber') === '585871' && group === 'Wednesday' && (
        <>
          <button
            id='buttonFetchWednesdayPlayers'
            className='button stacked'
            onClick={handleClick}>
            Fetch Wednesday Players
          </button>
          <br />
        </>
      )}
    </>
  );
}
