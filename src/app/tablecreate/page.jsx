import React from 'react';
import { EditTableButton } from '@/components/common';
import { get } from '@/components/common/utils';

export default function TableCreatePage() {
  const ghinNumber = get('ghinNumber');
  let text = 'Create Table';
  return (
    <>
      <p className='paragraph--center'>
        Before you can display this page,<br></br>
        you must create a table of your players<br></br>
        and groups in Google Sheets.<br></br>
        <br></br>
        Do this by adding a new sheet, whose name is<br></br>
        your GHIN Number ({ghinNumber}).<br></br>
        <br></br>
        PLEASE FOLLOW EXACTLY THE FORMAT OF THE SHEET NAMED 585871.
        <br />
        You may copy another user's table and then edit it.<br></br>
        You may give your groups any name you wish (no spaces).
      </p>
      <p className='paragraph--center'>
        When you have created your table,<br></br>
        go back to this app with your browser<br></br>and login again.
      </p>
      <br></br>
      <EditTableButton text={text} />
    </>
  );
}
