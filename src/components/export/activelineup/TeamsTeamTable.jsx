import React from 'react';

import { TeamsTeamTableHeader } from '@/components/export/activelineup';

const TeamsTeamTable = ({ teamNumber, teamMembers, teamTables, times }) => {
  let rows = teamMembers;
  let rowsTD = [];
  let playerCount;
  if (teamMembers) {
    playerCount = teamMembers.length;
  } else {
    playerCount = 0;
  }

  function generateRows() {
    for (let i = 0; i < playerCount; i++) {
      rowsTD[i] = (
        <tr key={rows[i].id}>
          <td className='lineup-table-body_td-left'>{rows[i].playerName}</td>
        </tr>
      );
    }
    return rowsTD;
  }

  return (
    <table className='lineup-table-body_td'>
      <thead>
        <TeamsTeamTableHeader
          times={times}
          teamNumber={teamNumber}
          teamTables={teamTables}
        />
      </thead>
      <tbody>{generateRows()}</tbody>
      <tfoot className='team-table-footer'></tfoot>
    </table>
  );
};

export default TeamsTeamTable;
