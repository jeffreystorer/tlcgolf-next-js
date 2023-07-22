import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { LineupTeamTableHeader } from '@/components/export/activelineup';
import { setTeamHcpAndProgs } from '@/components/common/utils';

const LineupTeamTable = ({
  showTeamHcp,
  teamNumber,
  teamMembers,
  teamTables,
  times,
  progs069,
  progAdj,
  teesSelected,
}) => {
  let teamName = 'team' + teamNumber;
  let teamHcp, teamProgs;
  let teamHcpAndProgsValues;
  function setTeamValues() {
    teamHcpAndProgsValues = setTeamHcpAndProgs(
      teamName,
      teamMembers,
      progAdj,
      progs069,
      teesSelected
    );
    teamHcp = teamHcpAndProgsValues[0];
    teamProgs = teamHcpAndProgsValues[1];
  }
  setTeamValues();
  let rows = teamMembers;
  let rowsTD = [];
  let teeCount = teesSelected.length;
  let playerCount;
  if (teamMembers) {
    playerCount = teamMembers.length;
  } else {
    playerCount = 0;
  }

  function generateRows() {
    for (let i = 0; i < playerCount; i++) {
      rowsTD[i] = (
        <tr className='lineup-table-body_tr' key={rows[i].id}>
          <td className='lineup-table-body_td-left'>{rows[i].playerName}</td>
          {generateCols(i)}
        </tr>
      );
    }
    return rowsTD;
  }

  function generateCols(i) {
    let tds = [];
    for (var j = 0; j < teeCount; j++) {
      if (
        rows[i].teeChoice === teesSelected[j].value //&& (showTeamHcp || progs069 > 0)
      ) {
        tds[j] = (
          <td className='lineup-table-body_td-other-bold' key={uuidv4()}>
            {rows[i].courseHandicaps[j]}
          </td>
        );
      } else {
        tds[j] = (
          <td className='lineup-table-body_td-other' key={uuidv4()}>
            {rows[i].courseHandicaps[j]}
          </td>
        );
      }
    }
    return tds;
  }

  return (
    <table className='lineup-table-body_td'>
      <thead>
        <LineupTeamTableHeader
          teesSelected={teesSelected}
          teamTables={teamTables}
          times={times}
          teamNumber={teamNumber}
        />
      </thead>
      <tbody>{generateRows()}</tbody>
      <tfoot className='team-table-footer'>
        <tr>
          <td colSpan={teeCount + 2}>
            {showTeamHcp || progs069 > 0 ? (
              <span>Team Hcp: {teamHcp}</span>
            ) : (
              <></>
            )}
            {progs069 > 0 ? (
              <span>
                &nbsp;&nbsp;Team Progs per {progs069}: {teamProgs}
              </span>
            ) : (
              <></>
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default LineupTeamTable;
