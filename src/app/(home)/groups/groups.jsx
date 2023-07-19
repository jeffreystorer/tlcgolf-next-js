'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { TableAll } from '@/components/groups';
import { GroupAndCourseDropdowns } from '@/components/common';
import { get } from '@/components/common/utils';
import {
  returnDisplayNumber,
  returnHasMultipleGroups,
} from '@/components/groups/utils';
import * as state from '@/store';

export default function Groups() {
  const router = useRouter();
  const [course, setCourse] = useRecoilState(state.course);
  const [group, setGroup] = useRecoilState(state.group);
  const isLoggedIn = get('isLoggedIn');
  if (!isLoggedIn) {
    router.push('/');
    return false;
  }
  const hasMultipleGroups = returnHasMultipleGroups();
  const groups = get('groups');
  let savedCourse = get('course');
  let savedGroup = get('group');

  useEffect(() => {
    setCourse(savedCourse);
    setGroup(savedGroup);
  }, []);

  let displayNumber = returnDisplayNumber(course, group, groups);

  switch (displayNumber) {
    case 1:
      return (
        <>
          {hasMultipleGroups ? (
            <p>
              Click on the dropdown boxes below
              <br />
              to select a group and a course.
            </p>
          ) : (
            <p>
              Click on the dropdown box below
              <br />
              to select a course.
            </p>
          )}
          <GroupAndCourseDropdowns />
        </>
      );
    case 2:
      return (
        <>
          <br />
          <TableAll />
        </>
      );
    default:
      return undefined;
  }
}
