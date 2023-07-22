import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { returnHeaderRow } from '@/components/export/utils';

const LineupTeamTableHeader = ({
  teesSelected,
  times,
  teamNumber,
  teamTables,
}) => {
  let cols = returnHeaderRow(teesSelected);
  const getHeader = () => {
    cols.shift();
    var keys = cols;
    return keys.map((key, index) => {
      return (
        <th className='lineup-table-header_th-other' key={uuidv4()}>
          {key}
        </th>
      );
    });
  };
  let teeTime;
  try {
    teeTime = times[teamNumber];
    if (times[teamNumber].includes('Shotgun')) {
      teeTime = teeTime + ' (' + teamTables.teeAssignments[teamNumber] + ')';
    }
  } catch (error) {}

  return (
    <>
      <tr>
        <th className='lineup-table-header_th-left'>{teeTime}</th>
        {getHeader()}
      </tr>
    </>
  );
};

export default LineupTeamTableHeader;
