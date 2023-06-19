import React from 'react';
import { get } from '@/components/common/utils';
import { returnHeaderRow } from '@/components/groups/utils';

export default function TableHeader() {
  const course = get('course');
  const teesSelected = get('teesSelected');
  let cols = returnHeaderRow(teesSelected[course]);
  const getHeader = () => {
    var keys = cols;
    return keys.map((key, index) => {
      return (
        <th className='td_ch' key={index} scope='col'>
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
