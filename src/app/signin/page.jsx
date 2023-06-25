import { CAPTAINS_URL } from '@/components/fetchdata/apis/constants';
import { getCaptains } from '@/components/fetchdata/apis/utils';
import { capitalize } from '@/components/common/utils';

async function getCaptainsData() {
  const res = await fetch(CAPTAINS_URL, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch captainsData');
  }

  return res.json();
}

export default async function SignIn({ searchParams }) {
  /**
   * searchParams = lastName
   */
  let lastName = searchParams.lastName;
  const captainsData = await getCaptainsData();
  const captains = getCaptains(captainsData.values);

  function getCaptainObject(lastName) {
    const captainObject = captainsObject.find(
      (element) => element.lastName === lastName
    );
    return captainObject;
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
      const ghinNumber = captain.ghinNumber;
      const path = `/fetchdatastepone?ghinNumber=${Number(
        ghinNumber
      )}&lastName=${lastName}&dataMode=${dataMode}`;
      router.push(path);
    } else {
      lastName = 'Invalid Last Name';
    }
  }

  return (
    <section id='signin'>
      <h1>TLC Golf</h1>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Name:&nbsp;&nbsp;
            <input
              type='text'
              name='lastName'
              defaultValue={lastName}
              required
            />
          </label>
          <button className={'button not-stacked'} type='submit'>
            Sign In
          </button>
          <label>
            <input type='checkbox' name='dataMode' defaultChecked />
            &nbsp;&nbsp;Fetch Data from GHIN
          </label>
        </fieldset>
      </form>
    </section>
  );
}
