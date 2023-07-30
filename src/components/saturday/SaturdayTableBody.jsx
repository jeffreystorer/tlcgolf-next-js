import { useRouter } from 'next/navigation';
import { useReturnBodyRows } from '@/components/saturday/hooks';
import { set } from '@/components/common/utils';

const SaturdayTableBody = () => {
  const router = useRouter();
  const returnBodyRows = useReturnBodyRows();
  let rows = returnBodyRows();
  let rowsTD = [];
  let colCount = rows[0][1].length;

  function onClick(e) {
    let golfer_id = e.target.id;
    const path = `/scores?golfer_id=${golfer_id}`;
    router.push(path);
  }

  function generateRows() {
    for (var i = 0; i < rows.length; i++) {
      rowsTD[i] = (
        <tr key={i}>
          <th scope='row' onClick={onClick} id={rows[i][0]}>
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

export default SaturdayTableBody;
