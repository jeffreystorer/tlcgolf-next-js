import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
//import * as _ from "lodash"
import { teeTimeCountOptionItems } from '@/components/lineup/optionitems';
import * as state from '@/store';

export default function TeeTimeCountDropdown() {
  const [teeTimeCount, setTeeTimeCount] = useRecoilState(state.teeTimeCount);
  const setTeamTables = useSetRecoilState(state.teamTables);

  const handleChange = (event) => {
    const oldCount = teeTimeCount;
    const newCount = event.target.value;
    const droppedTimesCount = oldCount - newCount;
    setTeeTimeCount(event.target.value);
    if (droppedTimesCount > 0)
      restoreDroppedTeeTimePlayersToPlayersNotInTeeTimes(oldCount, newCount);
    for (let i = oldCount; i < newCount; i++) {
      if (oldCount > 0) {
        let teamName = 'team' + i;
        setTeamTables((prevTeamTables) => ({
          ...prevTeamTables,
          [teamName]: [],
        }));
      }
    }
  };

  function restoreDroppedTeeTimePlayersToPlayersNotInTeeTimes(
    oldCount,
    newCount
  ) {
    for (let i = newCount; i < oldCount; i++) {
      let teamName = 'team' + i;
      setTeamTables((teamTables) => ({
        ...teamTables,
        [teamName]: [],
      }));
    }
  }

  return (
    <>
      <label className='selector_right'>
        <select value={teeTimeCount} onChange={handleChange}>
          <option value='0'># of Tee Times</option>
          {teeTimeCountOptionItems}
        </select>
      </label>
    </>
  );
}
