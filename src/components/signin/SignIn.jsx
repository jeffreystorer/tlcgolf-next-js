'use client';

import React, { useState } from 'react';
import { Header } from '@/components/common';
import preval from 'preval.macro';
import { capitalize, get, set } from '@/components/common/utils';

export default function SignIn({ data }) {
  const build =
    'Build: ' + preval`module.exports = new Date().toLocaleString();`;
  const [loading, setLoading] = useState(true);
  const [dataModeGHIN, setDataModeGHIN] = useState(true);
  let ghinNumber = get('ghinNumber') ? get('ghinNumber') : '';
  let lastName = get('lastName') ? get('lastName') : '';

  set('isLoggedIn', 'false');
  function handleClick(e) {
    dataModeGHIN ? set('dataMode', 'ghin') : set('dataMode', 'roster');
    setLoading(false);
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
    <>
      <Header />
      <div className='div--center'>
        <br />
        <br />
        <label htmlFor='ghinnumber'>GHIN Number:&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input
          className='input'
          type='text'
          id='ghinnumber'
          defaultValue={ghinNumber}
          onFocus={(event) => (event.target.value = ghinNumber)}
          onBlur={(event) => handleInputChange('ghinNumber', event)}
        />

        <br></br>
        <br></br>

        <label htmlFor='lastName'>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Name:&nbsp;&nbsp;&nbsp;&nbsp;
        </label>
        <input
          className='input'
          type='text'
          id='lastName'
          defaultValue={lastName}
          onFocus={(event) => (event.target.value = lastName)}
          onBlur={(event) => handleInputChange('lastName', event)}
        />
        <br />
        <br />
        <button className={'button not-stacked'} onClick={handleClick}>
          Sign In
        </button>
        <br />
        <br />
        <input
          className='checkbox'
          type='checkbox'
          id='dataModeGHIN'
          onChange={handleDataModeChange}
          defaultChecked
        />
        <label htmlFor='dataModeGHIN'>&nbsp;Fetch Data from GHIN</label>

        <footer className='footer--center'>
          {build}
          <br />
          <br />
        </footer>
      </div>
    </>
  );
}
