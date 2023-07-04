//TODO Add loading and error components?
import { FetchGHIN } from '@/app/fetchdata/fetchghin';
import {
  BASE_URL,
  SHEET_ID,
  KEY,
} from '@/components/fetchdata/apis/constants';
import {
  getPlayersAndGroups,
} from '@/components/fetchdata/apis/utils';

async function fetchTable(ghinNumber) {
  const TABLE_URL =
    BASE_URL +
    SHEET_ID +
    '/values/' + ghinNumber +
    KEY;
  const res = await fetch(TABLE_URL, { cache: 'no-store'});
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch tableData');
  }

  return res.json();
};

export default async function Page({ searchParams}) {
  const ghinNumber = searchParams.ghinNumber;
  const dataMode = searchParams.dataMode;
  const tableData = await fetchTable(ghinNumber);
  const table = tableData.values;
  const [groups, rawAllPlayersInTable] = getPlayersAndGroups(table);

  const data = {
    ghinNumber: ghinNumber,
    dataMode: dataMode,
    groups: groups,
    rawAllPlayersInTable: rawAllPlayersInTable,
  };

  return <FetchGHIN incomingData={data} />;
  
}
