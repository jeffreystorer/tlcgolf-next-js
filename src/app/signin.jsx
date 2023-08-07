'use client';
import { useRouter } from 'next/navigation';
import { clear, sclear, get, set } from '@/components/common/utils';
import '@/app/globals.css';

export default function SignIn({ captains }) {
  /**
   * captains is array of {ghinNumber:   , lastName:}
   */
  const router = useRouter();
  const ghinNumber = get('ghinNumber') ? get('ghinNumber') : '';
  const lastName = get('lastName') ? get('lastName') : '';
  const course = get('course') ? get('course') : '';
  const group = get('group') ? get('group') : '';
  const teesSelected = get('teesSelected') ? get('teesSelected') : '';
  clear();
  sclear();
  set('ghinNumber', ghinNumber);
  set('lastName', lastName);
  set('course', course);
  set('group', group);
  if (Object.keys(teesSelected).length === 6) set('teesSelected', teesSelected);

  function getCaptainObject(lastName) {
    return captains.find((captain) => captain.lastName === lastName);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    let dataMode = 'ghin';
    if (!formJson.dataMode) dataMode = 'roster';
    const captain = getCaptainObject(formJson.lastName);
    if (captain !== undefined) {
      set('ghinNumber', captain.ghinNumber);
      set('lastName', captain.lastName);
      set('dataMode', dataMode);
      const path = `/fetchdata?ghinNumber=${captain.ghinNumber}&dataMode=${dataMode}`;
      router.push(path);
    } else {
      set('lastName', 'Invalid Last Name');
      window.location.reload();
    }
  }
  return (
    <>
      <header id='header_not-signed-in'>
        <h1>TLC Golf</h1>
      </header>
      <main>
        <form id='sign-in' onSubmit={handleSubmit}>
          <fieldset>
            <label>
              Last Name:
              <input
                type='text'
                name='lastName'
                defaultValue={lastName}
                required
              />
            </label>
            <button className={'not-stacked'} type='submit'>
              Sign In
            </button>
            <label>
              <input type='checkbox' name='dataMode' defaultChecked />
              Fetch Data from GHIN
            </label>
          </fieldset>
        </form>
      </main>
    </>
  );
}
