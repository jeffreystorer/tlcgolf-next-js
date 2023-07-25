'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { GroupsPage } from '@/components/groups';
import { LineupPage } from '@/components/lineup';
import { GroupAndCourseDropdowns } from '@/components/common';
import { get } from '@/components/common/utils';
import {
  returnDisplayNumber,
  returnHasMultipleGroups,
} from '@/components/common/utils';
import * as state from '@/store';

export default function PageRouter({ page }) {
  const router = useRouter();
  const [course, setCourse] = useRecoilState(state.course);
  const [group, setGroup] = useRecoilState(state.group);
  const isLoggedIn = get('isLoggedIn');
  const hasMultipleGroups = returnHasMultipleGroups();
  const groups = get('groups');
  let savedCourse = get('course');
  let savedGroup = get('group');

  useEffect(() => {
    setCourse(savedCourse);
    setGroup(savedGroup);
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [setCourse, savedCourse, setGroup, savedGroup, router, isLoggedIn]);

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
      return <>{page === 'groups' ? <GroupsPage /> : <LineupPage />}</>;
    default:
      return undefined;
  }
}
