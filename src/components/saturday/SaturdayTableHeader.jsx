import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function SaturdayTableHeader() {
  let teesSelectedArray = ['C', 'C/M', 'M'];
  let teeCount = 3;
  let courses = ['DC', 'MG', 'MW', 'OR', 'PA', 'TP'];

  return (
    <>
      <tr>
        <th
          key={uuidv4()}
          scope='col'
          className='saturday-left-header-cell'></th>
        {courses.map((course) => {
          return (
            <th
              key={uuidv4()}
              className='center'
              colSpan={teeCount}
              scope='colgroup'>
              {course}
            </th>
          );
        })}
      </tr>
      <tr>
        <th
          key={uuidv4()}
          scope='col'
          className='saturday-left-header-cell'></th>
        {teesSelectedArray.map((tee) => {
          return (
            <th
              key={uuidv4()}
              className='saturday-other-header-cell'
              scope='col'>
              {tee}
            </th>
          );
        })}
        {teesSelectedArray.map((tee) => {
          return (
            <th
              key={uuidv4()}
              className='saturday-other-header-cell'
              scope='col'>
              {tee}
            </th>
          );
        })}
        {teesSelectedArray.map((tee) => {
          return (
            <th
              key={uuidv4()}
              className='saturday-other-header-cell'
              scope='col'>
              {tee}
            </th>
          );
        })}
        {teesSelectedArray.map((tee) => {
          return (
            <th
              key={uuidv4()}
              className='saturday-other-header-cell'
              scope='col'>
              {tee}
            </th>
          );
        })}
        {teesSelectedArray.map((tee) => {
          return (
            <th
              key={uuidv4()}
              className='saturday-other-header-cell'
              scope='col'>
              {tee}
            </th>
          );
        })}
        {teesSelectedArray.map((tee) => {
          return (
            <th
              key={uuidv4()}
              className='saturday-other-header-cell'
              scope='col'>
              {tee}
            </th>
          );
        })}
      </tr>
    </>
  );
}
