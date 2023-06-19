import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil'; //, useResetRecoilState } from 'recoil';
import { TableNext } from '@/components/export';
import * as courseData from '@/components/common/data';
import { get } from '@/components/common/utils';
import * as state from '@/store';

export default function Table() {
  const course = useRecoilValue(state.course);
  const group = useRecoilValue(state.group);
  const currentLineupIndex = useRecoilValue(state.currentLineupIndex);
  const groups = get('groups');

  if (
    groups.includes(group) &&
    courseData.courses.includes(course) &&
    currentLineupIndex > -1
  ) {
    //resetDimensionIndex()
    return <TableNext />;
  } else {
    return <Navigate replace to='/' />;
  }
}
