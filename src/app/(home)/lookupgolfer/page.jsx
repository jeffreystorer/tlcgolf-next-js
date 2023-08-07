//TODO Add loading and error components?
import { LookupDataTable } from '@/components/lookup';
import { GolferApi, LookupGolferApi } from '@/components/fetchdata/apis';
import Lookup from '../../../components/lookup/LookupPage';

async function fetchToken() {
  const GHIN_PASSWORD = process.env.NEXT_GHIN_PASSWORD;
  const res = await GolferApi.login(GHIN_PASSWORD, '585871');
  if (!res.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch token');
  }

  return res.data.golfer_user.golfer_user_token;
}
async function fetchGolfers(token, last_name, first_name, state) {
  const res = await LookupGolferApi.lookupGolfer(
    token,
    last_name,
    first_name,
    state
  );
  if (!res.status === 200) {
    throw new Error('Failed to lookup golfers');
  }

  return res.data;
}

export default async function LookupGolfer({ searchParams }) {
  const last_name = searchParams.last_name;
  const first_name = searchParams.first_name ? searchParams.first_name : null;
  const state = searchParams.state ? searchParams.state : null;
  const token = await fetchToken();
  const golferData = await fetchGolfers(token, last_name, first_name, state);

  return (
    <LookupDataTable
      last_name={last_name}
      first_name={first_name}
      golfers={golferData.golfers}
    />
  );
}
