'use client';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import {
  useUpdatePlayersInLineup,
  useUpdateTeamTables,
} from '@/components/common/hooks';
import { returnHasMultipleGroups } from '@/components/common/utils';
import { set } from '@/components/common/utils';
import * as state from '@/store';

export default function CourseDropdown() {
  const updateTeamTables = useUpdateTeamTables();
  const updatePlayersInLineup = useUpdatePlayersInLineup();
  const groups = useRecoilValue(state.groups);
  const hasMultipleGroups = returnHasMultipleGroups(groups);
  const [course, setCourse] = useRecoilState(state.course);
  const teesSelected = useRecoilValue(state.teesSelected);
  const setShowChangeTees = useSetRecoilState(state.showChangeTees);
  const setGroup = useSetRecoilState(state.group);

  function handleChange(e) {
    e.preventDefault();
    setCourse(e.target.value);
    set('course', e.target.value);
    setShowChangeTees(false);
    if (!hasMultipleGroups) {
      setGroup(groups[1]);
    }
    if (course !== '') {
      updateTeamTables(teesSelected[course]);
      updatePlayersInLineup(teesSelected[course]);
    }
  }

  return (
    <select name='course' value={course} onChange={handleChange}>
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
