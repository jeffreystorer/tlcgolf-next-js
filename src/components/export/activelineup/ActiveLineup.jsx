import React from 'react';
import Textarea from 'react-expanding-textarea';

export default function ActiveLineup({
  lineup,
  courseName,
  showIndividualHandicaps,
  generateExportLineupTeamTables,
  generateExportTeamsTeamTables,
  progAdjMessage,
}) {
  return (
    <div id='lineup-table-export'>
      <div id='lineup-image'>
        <h2>{lineup.playingDate + ' at ' + courseName}</h2>
        <div>
          {showIndividualHandicaps
            ? generateExportLineupTeamTables()
            : generateExportTeamsTeamTables()}
        </div>
        {showIndividualHandicaps && lineup.progs069 > 0 && (
          <p>{progAdjMessage}</p>
        )}
        <Textarea
          id='textarea-export'
          cols='36'
          value={lineup.textareaValue}
          readOnly={true}
        />
      </div>
    </div>
  );
}
