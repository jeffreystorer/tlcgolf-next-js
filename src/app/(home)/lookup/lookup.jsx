'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LookupEntryForm, LookupGolfer } from '@/components/lookup';
import { states } from '@/components/lookup/optionitems';

export default function Lookup() {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const last_name = formJson.last_name;
    const first_name = formJson.first_name;
    const state = formJson.state;
    router.push(
      `/lookupgolfer?last_name=${last_name}&first_name=${first_name}&state=${state}`
    );
  }

  return (
    <div id='lookup-entry'>
      <h2>Lookup GHIN Information</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            First Name:&nbsp;&nbsp;
            <input type='text' name='first_name' defaultValue='' />
          </label>
          <label>
            Last Name:&nbsp;&nbsp;
            <input type='text' name='last_name' required />
          </label>
          <label>
            State:&nbsp;&nbsp;
            <select name='state'>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
          <button className={'not-stacked'} type='submit'>
            Lookup Golfer
          </button>
        </fieldset>
      </form>
      <p>
        You may enter an initial or a name in the First Name field. The First
        Name and State fields are optional. If you leave the State field blank,
        you will search the entire country, but, if so, you should include at
        least the first letter of the First Name to narrow the search, which
        will return only the first 100 matches in the country.
      </p>
    </div>
  );
}
