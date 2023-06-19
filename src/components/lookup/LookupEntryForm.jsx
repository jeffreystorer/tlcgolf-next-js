import React from 'react';
import { states } from '@/components/lookup/optionitems';

export default function LookupEntryForm({ handleInputChange, handleClick }) {
  return (
    <>
      <div className='div--center'>
        <br />
        <br />
        <label htmlFor='first_name'>First Name:&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input
          className='input'
          type='text'
          id='first_name'
          onBlur={(event) => handleInputChange('first_name', event)}
        />
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
          &nbsp;&nbsp;&nbsp;
        </span>
        <br />
        <br />
        <label htmlFor='last_name'>Last Name:&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input
          className='input'
          type='text'
          id='last_name'
          onBlur={(event) => handleInputChange('last_name', event)}
        />
        <span style={{ color: 'red' }}> (required)</span>
        <br />
        <br />
        <label htmlFor='state'>State:&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <select
          className='input'
          id='state'
          onBlur={(event) => handleInputChange('state', event)}>
          {states.map((state) => (
            <option value={state}>{state}</option>
          ))}
        </select>
        <span>&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;</span>
        <br />
        <br />
        <button className={'button not-stacked'} onClick={handleClick}>
          Lookup Golfer
        </button>
        <br />
        <br />
        <p style={{ width: '60%', margin: 'auto', fontSize: '1.2rem' }}>
          You may enter an initial or a name in the First Name field. The First
          Name and State fields are optional. If you leave the State field
          blank, you will search the entire country, but, if so, you should
          include at least the first letter of the First Name to narrow the
          search, which will return only the first 100 matches in the country.
        </p>
      </div>
    </>
  );
}
