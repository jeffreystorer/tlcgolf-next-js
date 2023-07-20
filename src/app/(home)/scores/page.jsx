//TODO Add loading and error components?
import { ScoresDynamic } from '@/app/(home)/scores/scoresdynamic';
import { GolferApi, ScoresApi } from '@/components/fetchdata/apis';

async function fetchToken() {
  const GHIN_PASSWORD = process.env.NEXT_GHIN_PASSWORD;
  const res = await GolferApi.login(GHIN_PASSWORD, '585871');
  if (!res.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch token');
  }

  return res.data.golfer_user.golfer_user_token;
}
async function fetchScores(token, golfer_id) {
  const res = await ScoresApi.scores(token, golfer_id);
  if (!res.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to get scores');
  }

  return res.data;
}

export default async function Page({ searchParams }) {
  const golfer_id = searchParams.golfer_id;
  const token = await fetchToken();
  const scores = await fetchScores(token, golfer_id);

  return <ScoresDynamic golfer_id={golfer_id} scores={scores} />;
}
