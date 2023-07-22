import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { TableAll } from '@/components/lineup';
import { GroupAndCourseDropdowns } from '@/components/common';
import { courses } from '@/components/common/data';
import { get } from '@/components/common/utils';
import { returnHasMultipleGroups } from '@/components/groups/utils';
import * as state from '@/store';

export default function Table() {
  const groups = get('groups');
  const group = get('group');
  const course = get('course');
  const teesSelected = get('teesSelected');
  const setGroup = useSetRecoilState(state.group);
  const setCourse = useSetRecoilState(state.course);
  const setTeesSelected = useSetRecoilState(state.teesSelected);
  const hasMultipleGroups = returnHasMultipleGroups();

  useEffect(() => {
    setGroup(group);
    setCourse(course);
    setTeesSelected(teesSelected);
  }, [setGroup, group, setCourse, course, teesSelected]);

  if (groups.includes(group) && courses.includes(course)) {
    return <TableAll />;
  } else {
    return (
      <>
        {hasMultipleGroups ? (
          <p className='div--center-bold'>
            Click on the dropdown boxes below
            <br />
            to select a group and a course.
          </p>
        ) : (
          <p className='div--center-bold'>
            Click on the dropdown box below
            <br />
            to select a course.
          </p>
        )}
        <GroupAndCourseDropdowns />
      </>
    );
  }
}
