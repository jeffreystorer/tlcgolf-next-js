'use client';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TableHeader, TableBody } from '@/components/groups';
import { GroupAndCourseDropdowns } from '@/components/common';
import { get, set } from '@/components/common/utils';
import * as state from '@/store';

export default function TableAll() {
  const group = useRecoilValue(state.group);
  const course = useRecoilValue(state.course);
  const teesSelected = get('teesSelected');
  const setTeesSelected = useSetRecoilState(state.teesSelected);
  setTeesSelected(teesSelected);
  const [showLocalNumbers, setShowLocalNumbers] = useState(
    get('showLocalNumbers')
  );

  function handleShowLocalNumbersChange() {
    set('showLocalNumbers', !showLocalNumbers);
    setShowLocalNumbers((prevState) => !prevState);
  }

  return (
    <>
      <GroupAndCourseDropdowns />
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th
              scope='col'
              colSpan={teesSelected[course].length + 1}
              className='tr--center-background-white'>
              {group} at {course.toUpperCase()}
            </th>
          </tr>
          <tr>
            <th
              colSpan={teesSelected[course].length + 1}
              className='tr--center-background-white golfer_id link--revision-scores'>
              Click on a Player for Revision Scores
            </th>
          </tr>
          <TableHeader />
        </thead>
        <tbody>
          <TableBody />
        </tbody>
      </table>
      <input
        className='checkbox'
        type='checkbox'
        id='showLocalNumbers'
        onChange={handleShowLocalNumbersChange}
        defaultChecked={showLocalNumbers}></input>
      <label htmlFor='showLocalNumbers'>&nbsp;Show Local Numbers</label>
    </>
  );
}
