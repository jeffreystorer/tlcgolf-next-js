'use client';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    setTeesSelected(teesSelected);
  }, [setTeesSelected, teesSelected]);

  const [showLocalNumbers, setShowLocalNumbers] = useState(
    get('showLocalNumbers')
  );

  function handleShowLocalNumbersChange() {
    set('showLocalNumbers', !showLocalNumbers);
    setShowLocalNumbers((prevState) => !prevState);
  }

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
        &nbsp;&nbsp;Show Local Numbers
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
}
