import React from 'react';
import {
  useUpdatePlayersInLineup,
  useUpdateTeamTables,
} from '@/components/common/hooks';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import * as state from '@/store';
import { set } from '@/components/common/utils';
export default function CourseDropdown({ groups, hasMultipleGroups }) {
  const updateTeamTables = useUpdateTeamTables();
  const updatePlayersInLineup = useUpdatePlayersInLineup();
  const [course, setCourse] = useRecoilState(state.course);
  const setGroup = useSetRecoilState(state.group);
  const setShowSelectTees = useSetRecoilState(state.showSelectTees);
  const teesSelected = useRecoilValue(state.teesSelected);

  function handleCourseChange(e) {
    const course = e.target.value;
    setShowSelectTees(false);
    setCourse(course);
    set('course', course);
    if (!hasMultipleGroups) {
      setGroup(groups[1]);
    }
    if (course !== '') {
      updateTeamTables(course, teesSelected[course]);
      updatePlayersInLineup(course, teesSelected[course]);
    }
  }

  return (
    <>
      <label className='selector_right'>
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
      </label>
    </>
  );
}
