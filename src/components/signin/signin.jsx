'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
//import preval from 'preval.macro';
import { capitalize, get, set } from '@/components/common/utils';
import { setSheetUrl } from '@/components/fetchdata/apis/utils';

//TODO: get preval macro to work
export function SignIn() {
  /*  const build =
    'Build: ' + preval`module.exports = new Date().toLocaleString();`; */
  const router = useRouter();
  const [dataModeGHIN, setDataModeGHIN] = useState(true);
  let ghinNumber = get('ghinNumber') ? get('ghinNumber') : '';
  let lastName = get('lastName') ? get('lastName') : '';
  const token = get('token');

  set('isLoggedIn', 'false');
  function handleClick(e) {
    e.preventDefault();
    const sheets = get('sheets');
    if (!setSheetUrl(sheets)) {
      router.push('/signin/tablecreate');
      return;
    }
    dataModeGHIN ? set('dataMode', 'ghin') : set('dataMode', 'roster');
    const dataMode = get('dataMode');
    ghinNumber = get('ghinNumber');
    const path = `/fetchdatasteptwo?token=${token}&ghinNumber=${Number(
      ghinNumber
    )}&dataMode=${dataMode}`;
    router.push(path);
  }

  function handleDataModeChange() {
    setDataModeGHIN((prevState) => !prevState);
    if (dataModeGHIN === false) {
      set('dataMode', 'ghin');
    } else {
      set('dataMode', 'roster');
    }
  }

  const handleInputChange = (field, event) => {
    const target = event.target;
    if (target) set(`${field}`, target.value.trim());
  };

  return (
    <section id='signin'>
      <h1>TLC Golf</h1>
      <br />
      <br />
      <form>
        <fieldset>
          <label>
            GHIN Number:&nbsp;&nbsp;
            <input
              type='text'
              name='ghinNumber'
              defaultValue={ghinNumber}
              onFocus={(event) => (event.target.value = ghinNumber)}
              onBlur={(event) => handleInputChange('ghinNumber', event)}
              required
            />
          </label>
          <label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Name:&nbsp;&nbsp;
            <input
              type='text'
              name='lastName'
              defaultValue={lastName}
              onFocus={(event) => (event.target.value = lastName)}
              onBlur={(event) => handleInputChange('lastName', event)}
              required
            />
          </label>
          <button className={'button not-stacked'} onClick={handleClick}>
            Sign In
          </button>
          <label>
            <input
              type='checkbox'
              name='dataModeGHIN'
              onChange={handleDataModeChange}
              defaultChecked
            />
            &nbsp;&nbsp;Fetch Data from GHIN
          </label>
        </fieldset>
      </form>

      {/* <footer>  {build} </footer>*/}
    </section>
  );
}
