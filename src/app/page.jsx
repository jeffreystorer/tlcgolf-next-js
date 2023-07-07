import {SignIn} from '@/app/signin';
import { CAPTAINS_URL } from '@/components/fetchdata/apis/constants';
import { getCaptains } from '@/components/fetchdata/apis/utils';

async function getCaptainsData() {
  const res = await fetch(CAPTAINS_URL, { cache: 'no-store'});
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch captainsData');
  }

  return res.json();
}

export default async function Page() {
  const captainsData = await getCaptainsData();
  const captains = getCaptains(captainsData.values);


  return <SignIn captains={captains} />
}