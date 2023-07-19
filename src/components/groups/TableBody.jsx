'use client';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { get, set } from '@/components/common/utils';
import { returnBodyRows } from '@/components/groups/utils';
import * as state from '@/store';

const TableBody = () => {
  const router = useRouter();
  const course = useRecoilValue(state.course);
  const group = useRecoilValue(state.group);
  const groups = get('groups');

  let rows = returnBodyRows(course, group, groups);
  let rowsTD = [];
  let colCount = rows[0][1].length;

  function onClick(e) {
    let golfer_id = e.target.id;
    set('golfer_id', golfer_id);
    router.push('/scores');
  }

  function generateRows() {
    for (var i = 0; i < rows.length; i++) {
      rowsTD[i] = (
        <tr key={i}>
          <td id={rows[i][0]} onClick={onClick}>
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
      tds[j] = <td key={j}>{rows[i][1][j]}</td>;
    }
    return tds;
  }

  return <>{generateRows()}</>;
};

export default TableBody;
