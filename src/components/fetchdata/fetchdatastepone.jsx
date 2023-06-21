import { StoreFetchedDataStepOne } from '@/components/fetchdata/utils/storefetcheddatastepone';
import { v4 as uuidv4 } from 'uuid';

import {
  BASE_URL,
  SHEET_ID,
  BATCH_KEY,
  SHEET_URL,
} from '@/components/fetchdata/apis/constants';
import { GolferApi } from '@/components/fetchdata/apis';
import {
  setCaptains,
  setTutorials,
  setBets,
  setSchedules,
  setCourseData,
} from '@/components/fetchdata/apis/utils';

async function getSheetsData() {
  const res = await fetch(SHEET_URL, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch sheetsData');
  }

  return res.json();
}

async function getBatchData() {
  const BATCH_URL =
    BASE_URL +
    SHEET_ID +
    '/values:batchGet?ranges=Schedules&ranges=Tutorials&ranges=Bets&ranges=Captains&ranges=GHIN_Numbers' +
    BATCH_KEY;
  const res = await fetch(BATCH_URL, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch sheetsData');
  }

  return res.json();
}

async function getToken() {
  const GHIN_PASSWORD = process.env.NEXT_PUBLIC_GHIN_PASSWORD;
  const res = await GolferApi.login(GHIN_PASSWORD, '585871');
  if (!res.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch token');
  }

  return res.data.golfer_user.golfer_user_token;
}

export async function FetchDataStepOne() {
  const sheetsData = getSheetsData();
  const batchData = getBatchData();
  const tokenData = getToken();
  const [sheets, batch, token] = await Promise.all([
    sheetsData,
    batchData,
    tokenData,
  ]);

  return <StoreFetchedDataStepOne sheets={sheets} batch={batch} token={token} />;
}
