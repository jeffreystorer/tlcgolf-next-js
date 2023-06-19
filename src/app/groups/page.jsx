import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useVisibilityChange } from 'use-visibility-change';
import { TableAll } from '@/components/groups';
import { FetchData } from '@/components/fetchdata';
import { GroupAndCourseDropdowns } from '@/components/common';
import { get, loginStale } from '@/components/common/utils';
import {
  returnDisplayNumber,
  returnHasMultipleGroups,
} from '@/components/groups/utils';
import * as state from '@/store';

export default function GroupsPage() {
  const hasMultipleGroups = returnHasMultipleGroups();
  const groups = get('groups');
  const [course, setCourse] = useRecoilState(state.course);
  const [group, setGame] = useRecoilState(state.group);
  let savedCourse = get('course');
  let savedGame = get('group');
  const onShow = () => {
    window.location.reload();
  };
  useVisibilityChange({ onShow });

  useEffect(() => {
    setCourse(savedCourse);
    setGame(savedGame);
    //eslint-disable-next-line
  }, []);

  let displayNumber = returnDisplayNumber(course, group, groups);

  if (loginStale()) return <FetchData />;

  switch (displayNumber) {
    case 1:
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
