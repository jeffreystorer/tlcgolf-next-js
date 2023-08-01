'use client';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import { TableHeader, TableBody } from '@/components/groups';
import { GroupAndCourseDropdowns } from '@/components/common';
import {
  sget,
  returnDisplayNumber,
  returnHasMultipleGroups,
} from '@/components/common/utils';
import * as state from '@/store';

export default function GroupsPage() {
  const groups = useRecoilValue(state.groups);
  const courseData = useRecoilValue(state.courseData);
  const hasMultipleGroups = returnHasMultipleGroups(groups);
  const router = useRouter();
  const course = useRecoilValue(state.course);
  const group = useRecoilValue(state.group);
  const isLoggedIn = sget('isLoggedIn');

  const [showLocalNumbers, setShowLocalNumbers] = useRecoilState(
    state.showLocalNumbers
  );

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [router, isLoggedIn]);

  function handleShowLocalNumbersChange() {
    setShowLocalNumbers((prevState) => !prevState);
  }

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
        <div id='groups'>
          <GroupAndCourseDropdowns />
          <br />
          <label>
            <input
              type='checkbox'
              onChange={handleShowLocalNumbersChange}
              defaultChecked={showLocalNumbers}
            />
            Show Local Numbers
          </label>
          <table>
            <caption>Click on a Player for Revision Scores</caption>
            <thead>
              <TableHeader />
            </thead>
            <tbody>
              <TableBody />
            </tbody>
          </table>
        </div>
      );
    default:
      return undefined;
  }
}
