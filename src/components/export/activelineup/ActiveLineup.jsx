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
    <div className='div--padded10px div--center div--background-white div--fit-content center'>
      <div id='lineup-table-div' className='lineup-table_export'>
        <table>
          <thead>
            <tr>
              <td className='lineup-table-head_td'>
                {lineup.playingDate + ' at ' + courseName}
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </thead>
          <tbody className='div--fit-content'>
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
    </div>
  );
}
