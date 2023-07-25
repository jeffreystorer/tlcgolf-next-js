'use client';
import {
  useUpdatePlayersInLineup,
  useUpdateTeamTables,
} from '@/components/common/hooks';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import * as state from '@/store';
import { get, set } from '@/components/common/utils';
export default function CourseDropdown({ groups, hasMultipleGroups }) {
  const updateTeamTables = useUpdateTeamTables();
  const updatePlayersInLineup = useUpdatePlayersInLineup();
  const course = get('course');
  const setCourse = useSetRecoilState(state.course);
  const setGroup = useSetRecoilState(state.group);
  const setShowChangeTees = useSetRecoilState(state.showChangeTees);
  const teesSelected = get('teesSelected');

  function handleCourseChange(e) {
    const course = e.target.value;
    setShowChangeTees(false);
    setCourse((prev) => course);
    set('course', course);
    if (!hasMultipleGroups) {
      setGroup((prev) => groups[1]);
      set('group', groups[1]);
    }
    if (course !== '') {
      updateTeamTables(course, teesSelected[course]);
      updatePlayersInLineup(course, teesSelected[course]);
    }
  }

  return (
    <select
      value={course}
      onChange={handleCourseChange}>
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
