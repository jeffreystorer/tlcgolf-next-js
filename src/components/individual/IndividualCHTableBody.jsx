import React from 'react';
import { returnBodyRows } from '@/components/individual/utils';

const CHTableBody = (props) => {
  const rows = returnBodyRows(
    'CH',
    props.index,
    props.gender,
    props.teesSelected,
    props.teeValues,
    props.ratings,
    props.slopes,
    props.pars
  );

  return (
    <>
      {rows.map(function (row, i) {
        return (
          <tr key={i}>
            <td>{row[0]}</td>
            <td className='td_ch'>{row[1]}</td>
            <td className='td_ch'>{row[2]}</td>
            <td className='td_ch'>{row[3]}</td>
            <td className='td_ch'>{row[4]}</td>
            <td className='td_ch'>{row[5]}</td>
            <td className='td_ch'>{row[6]}</td>
          </tr>
        );
      })}
    </>
  );
};

export default CHTableBody;
