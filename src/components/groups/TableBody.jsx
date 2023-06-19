import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { get, set } from '@/components/common/utils';
import { returnBodyRows } from '@/components/groups/utils';
import * as state from '@/store';

const TableBody = () => {
  const navigate = useNavigate();
  const course = useRecoilValue(state.course);
  const group = useRecoilValue(state.group);
  const groups = get('groups');

  let rows = returnBodyRows(course, group, groups);
  let rowsTD = [];
  let colCount = rows[0][1].length;

  function onClick(e) {
    let golfer_id = e.target.id;
    set('golfer_id', golfer_id);
    navigate('/scores');
  }

  function generateRows() {
    for (var i = 0; i < rows.length; i++) {
      rowsTD[i] = (
        <tr key={i}>
          <td id={rows[i][0]} className='golfer_id' onClick={onClick}>
            {rows[i][1][0]}
          </td>
          {generateCols(i)}
        </tr>
      );
    }
    return rowsTD;
  }

  function generateCols(i) {
    let tds = [];
    for (var j = 1; j < colCount; j++) {
      tds[j] = (
        <td className='td_ch' key={j}>
          {rows[i][1][j]}
        </td>
      );
    }
    return tds;
  }

  return <>{generateRows()}</>;
};

export default TableBody;
