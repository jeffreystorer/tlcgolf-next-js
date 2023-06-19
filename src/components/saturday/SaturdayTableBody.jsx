import React from 'react';
import { useNavigate } from 'react-router-dom';
import { returnBodyRows } from '@/components/saturday/utils';
import { set } from '@/components/common/utils';

const SaturdayTableBody = () => {
  const navigate = useNavigate();
  let rows = returnBodyRows();
  let rowsTD = [];
  let colCount = rows[0][1].length;

  function onClick(e) {
    let golfer_id = e.target.id;
    set('golfer_id', golfer_id);
    navigate('/scores');
  }

  function generateRows() {
    let oddRow = false;
    for (var i = 0; i < rows.length; i++) {
      oddRow = !oddRow;
      rowsTD[i] = (
        <tr key={i} className={`${oddRow ? '' : 'tr--shaded'}`}>
          <td
            className='saturday-left-row-cell golfer_id'
            onClick={onClick}
            id={rows[i][0]}>
            {rows[i][1][0]}
          </td>
          {generateCols(i, oddRow)}
        </tr>
      );
    }
    return rowsTD;
  }

  function generateCols(i, oddRow) {
    let tds = [];
    let oddCol = false;
    for (var j = 1; j < colCount; j++) {
      oddCol = !oddCol;
      tds[j] = (
        <td
          className={`saturday-other-row-cell ${oddRow & oddCol ? '' : ''}`}
          key={j}>
          {rows[i][1][j]}
        </td>
      );
    }
    return tds;
  }

  return <>{generateRows()}</>;
};

export default SaturdayTableBody;
