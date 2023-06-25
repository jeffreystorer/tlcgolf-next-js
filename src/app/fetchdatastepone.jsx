//TODO Add loading and error components?
import FetchDataFromGHIN from '@/app/fetchghindata';
import {
  BASE_URL,
  SHEET_ID,
  BATCH_KEY,
import {
  getPlayersAndGroups,
} from '@/components/fetchdata/apis/utils';

async function getBatchData(ghinNumber) {
  const BATCH_URL =
    BASE_URL +
    SHEET_ID +
    '/values:batchGet?ranges=GHIN_Numbers&ranges=' +
    ghinNumber +
    BATCH_KEY;
  const res = await fetch(BATCH_URL, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch sheetsData');
  }

  return res.json();
}

export default async function FetchDataStepOne({ captains, ghinNumber, lastName, dataMode }) {
  const batch = await getBatchData(ghinNumber);

  /**
   * batch.valueRanges
   * 0 GHIN_Numbers
   * 1 Table
   */
  const roster = batch.valueRanges[0].values;
  const table = batch.valueRanges[1].values;
  };
  const [groups, allPlayersInTable] = getPlayersAndGroups(table);

  const ghinInputData = {
    ghinNumber: ghinNumber,
    lastName: lastName,
    dataMode: dataMode,
    groups: groups;
    allPlayersInTable: allPlayersInTable

  }

  return <FetchGHINData data={ghinInputData} />;
}
