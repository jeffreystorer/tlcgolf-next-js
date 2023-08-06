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
          <th scope='row'>{rows[i].playerName}</th>
        </tr>
      );
    }
    return rowsTD;
  }

  return (
    <table>
      <thead>
        <TeamsTeamTableHeader
          times={times}
          teamNumber={teamNumber}
          teamTables={teamTables}
        />
      </thead>
      <tbody>{generateRows()}</tbody>
    </table>
  );
};

export default TeamsTeamTable;
