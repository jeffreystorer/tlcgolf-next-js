//TODO Add loading and error components?
import { FetchData }from '@/app/fetchdata/fetchdata';
import {
  BASE_URL,
  SHEET_ID,
  KEY,
} from '@/components/fetchdata/apis/constants';
import {  getPlayersAndGroups } from '@/components/fetchdata/apis/utils';

async function getTableData(ghinNumber) {
  const TABLE_URL =
    BASE_URL +
    SHEET_ID +
    '/values/' +  ghinNumber +
    KEY;
  const res = await fetch(TABLE_URL, { next: { revalidate: 10 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch tableData');
  }

  return res.json();
}

export default async function FetchTablePage({ searchParams }) {
  const tableData = await getTableData(searchParams.ghinNumber);
  const table = tableData.values;
  const [groups, allPlayersInTable] = getPlayersAndGroups(table);

  const data = {
    ghinNumber: searchParams.ghinNumber,
    lastName: searchParams.lastName,
    dataMode: searchParams.dataMode,
    groups: groups,
    allPlayersInTable: allPlayersInTable

  }

  return <FetchData incomingData={data} />
  }
