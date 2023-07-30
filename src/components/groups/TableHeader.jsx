'use client';
import { get } from '@/components/common/utils';
import { returnHeaderRow } from '@/components/common/utils';

export default function TableHeader() {
  const course = get('course');
  const teesSelected = get('teesSelected');
  console.log('😊😊 course', course);
  console.log('😊😊 teesSelected', teesSelected);
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
