'use client';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { get, set } from '@/components/common/utils';
import { useReturnBodyRows } from '@/components/groups/hooks';
import * as state from '@/store';

const TableBody = () => {
  const router = useRouter();
  const returnBodyRows = useReturnBodyRows();

  let rows = returnBodyRows();
  let rowsTD = [];
  let colCount = rows[0][1].length;

  function onClick(e) {
    let golfer_id = e.target.id;
    router.push(`/scores?golfer_id=${golfer_id}`);
  }

  function generateRows() {
    for (var i = 0; i < rows.length; i++) {
      rowsTD[i] = (
        <tr key={i}>
          <th scope='row' id={rows[i][0]} onClick={onClick}>
            {rows[i][1][0]}
          </th>
          {generateCols(i)}
        </tr>
      );
    }
    return rowsTD;
  }

  function generateCols(i) {
    let tds = [];
    for (var j = 1; j < colCount; j++) {
      tds[j] = <td key={j}>{rows[i][1][j]}</td>;
    }
    return tds;
  }

  return <>{generateRows()}</>;
};

export default TableBody;
