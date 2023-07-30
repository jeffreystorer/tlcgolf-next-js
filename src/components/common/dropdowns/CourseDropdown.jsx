'use client';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import {
  useUpdatePlayersInLineup,
  useUpdateTeamTables,
} from '@/components/common/hooks';
import { get, set } from '@/components/common/utils';
import * as state from '@/store';

export default function CourseDropdown({ hasMultipleGroups }) {
  console.log("😊😊 rendering CourseDropDown")
  const updateTeamTables = useUpdateTeamTables();
  const updatePlayersInLineup = useUpdatePlayersInLineup();
  const groups = useRecoilValue(state.groups);
  let course = get('course');
  console.log("😊😊 course", course);
  const setShowChangeTees = useSetRecoilState(state.showChangeTees);
  const teesSelected = get('teesSelected');

  function handleCourseChange(e) {
    course = e.target.value;
    setShowChangeTees(false);
    set('course', course);
    if (!hasMultipleGroups) {
      set('group', groups[1]);
    }
    if (course !== '') {
      updateTeamTables(teesSelected[course]);
      updatePlayersInLineup(teesSelected[course]);
    }
  }

  return (
    <select value={course} onChange={handleCourseChange}>
      <option key={'0'} value=''>
        Select Course
      </option>
      <option key={'1'} value='dc'>
        Deer Creek
      </option>
      <option key={'2'} value='mg'>
        Magnolia
      </option>
      <option key={'3'} value='mw'>
        Marshwood
      </option>
      <option key={'4'} value='or'>
        Oakridge
      </option>
      <option key={'5'} value='pa'>
        Palmetto
      </option>
      <option key={'6'} value='tp'>
        Terrapin Point
      </option>
    </select>
  );
}
