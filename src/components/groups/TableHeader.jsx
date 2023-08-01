'use client';
import { useRecoilValue } from 'recoil';
import { returnHeaderRow } from '@/components/common/utils';
import * as state from '@/store';

export default function TableHeader() {
  const course = useRecoilValue(state.course);
  const teesSelected = useRecoilValue(state.teesSelected);
  let cols = returnHeaderRow(teesSelected[course]);
  const getHeader = () => {
    var keys = cols;
    return keys.map((key, index) => {
      return (
        <th key={index} scope='col'>
          {key}
        </th>
      );
    });
  };

  return (
    <>
      <tr>{getHeader()}</tr>
    </>
  );
}
