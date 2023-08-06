import React from 'react';
import { Textarea } from '@/components/export/activelineup';

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
      <table id='lineup-image'>
        <thead>
          <tr>
            <th scope='col'>{lineup.playingDate + ' at ' + courseName}</th>
          </tr>
        </thead>
        <tbody>
          <tr className='lineup-table-body_td'>
            {showIndividualHandicaps ? (
              <td>{generateExportLineupTeamTables()}</td>
            ) : (
              <td>{generateExportTeamsTeamTables()}</td>
            )}
          </tr>
        </tbody>
        <tfoot className='tfoot'>
          {showIndividualHandicaps && lineup.progs069 > 0 && (
            <>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td className='textarea_td'>
                  <textarea
                    className='textarea--center-no-border'
                    rows='1'
                    cols='41'
                    value={progAdjMessage}
                    readOnly={true}></textarea>
                </td>
              </tr>
            </>
          )}

          <tr>
            <td className='textarea_td'>
              <Textarea textareaValue={lineup.textareaValue} cols='41' />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
