'use client';
import { v4 as uuidv4 } from 'uuid';

function IndividualTableHeader({ tableName }) {
  let courses = ['DC', 'MG', 'MW', 'OR', 'PA', 'TP'];
  return (
    <tr>
      <th scope='col'></th>
      {courses.map(function (courses) {
        return (
          <th key={uuidv4()} scope='col'>
            {courses}
          </th>
        );
      })}
    </tr>
  );
}
export default IndividualTableHeader;
