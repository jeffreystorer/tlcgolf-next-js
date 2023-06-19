import React from 'react';
import { useRecoilValue } from 'recoil';
import { LineupTextarea } from '@/components/lineup';
import { AutoButtons } from '@/components/lineup/buttons';
import { useGenerateTeamTables } from '@/components/lineup/hooks';
import * as state from '@/store';
import { createProgAdjMessage, getCourseName } from '@/components/common/utils';

import { ok } from 'assert';

export default function ActiveLineup() {
  const generateTeamTables = useGenerateTeamTables();
  const course = useRecoilValue(state.course);
  const playingDate = useRecoilValue(state.playingDate);
  const progAdj = useRecoilValue(state.progAdj);
  const progs069 = useRecoilValue(state.progs069);
  const okToSave = useRecoilValue(state.okToSave);
  const okToAddPlayers = useRecoilValue(state.okToAddPlayers);
  const progAdjMessage = createProgAdjMessage(progAdj, progs069);
  const courseName = getCourseName(course);
  let header = '';
  if (playingDate !== 'Date') {
    header = playingDate + ' at ' + courseName;
  }

  return (
    <>
      <AutoButtons />
      <table className='lineup-table'>
        <thead>
          <tr>
            <td className='lineup-table-head_td'>{header}</td>
          </tr>
          <tr>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='lineup-table-body_td'>{generateTeamTables()}</td>
          </tr>
        </tbody>
        <tfoot className='tfoot'>
          {progs069 > 0 && okToAddPlayers && (
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
            <td className='textarea_td'>{okToSave && <LineupTextarea />}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
