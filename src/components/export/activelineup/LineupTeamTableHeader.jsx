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
    var items = cols;
    return items.map((item) => {
      return (
        <th scope='col' key={uuidv4()}>
          {item}
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
        <th scope='col'>{teeTime}</th>
        {getHeader()}
      </tr>
    </>
  );
};

export default LineupTeamTableHeader;
