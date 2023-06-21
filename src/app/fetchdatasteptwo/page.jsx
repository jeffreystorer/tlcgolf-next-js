import { StoreFetchedDataStepTwo } from '@/components/fetchdata/utils/storefetcheddatasteptwo';

import {
  BASE_URL,
  SHEET_ID,
  KEY,
  WEDNESDAY_URL,
} from '@/components/fetchdata/apis/constants';
import { GolferAPI, GolferApi } from '@/components/fetchdata/apis';

async function getWednesdayData() {
  const res = await fetch(WEDNESDAY_URL, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch wednesdayData');
  }

  return res.json();
}

async function getTableData(ghinNumber) {
  const TABLE_URL = BASE_URL + SHEET_ID + '/values/' + ghinNumber + KEY;
  const res = await fetch(TABLE_URL, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch tableData');
  }
  return res.json();
}

async function findGolfer(ghinNumber, token) {
  const res = await GolferApi.findGolfer(ghinNumber, token);
  if (!res.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to find golfer');
  }

  return res.data;
}

export default async function FetchDataStepTwo({ searchParams }) {
  const tableData = getTableData(searchParams.ghinNumber);
  const foundGolferData = findGolfer(
    searchParams.ghinNumber,
    searchParams.token
  );

  const [table, foundGolfer] = await Promise.all([tableData, foundGolferData]);
  let wednesday;
  if (searchParams.ghinNumber === '585871') {
    const wednesdayData = getWednesdayData();
    [wednesday] = await Promise.all([wednesdayData]);
  }

  return (
    <>
      <h1>Data</h1>
      <h2>Table</h2>
      <table>
        <thead>
          <tr>
            {table.values
              .filter((value, index) => index === 0)
              .map((value) => value.map((item) => <th>{item}</th>))}
          </tr>
        </thead>

        <tbody>
          {table.values
            .filter((value, index) => index > 0)
            .map((value) => (
              <tr>
                {value.map((item) => (
                  <td>{item}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <h2>Found Golfer</h2>
      <p>
        {foundGolfer.golfers[0].first_name}&nbsp;
        {foundGolfer.golfers[0].last_name}&nbsp;{foundGolfer.golfers[0].ghin}
      </p>

      {searchParams.ghinNumber === '585871' && (
        <>
          <h2>Wednesday</h2>
          <table>
            <thead>
              <tr>
                {wednesday.values
                  .filter((value, index) => index === 0)
                  .map((value) => value.map((item) => <th>{item}</th>))}
              </tr>
            </thead>
            <tbody>
              {wednesday.values
                .filter((value, index) => index > 0)
                .map((value) => (
                  <tr>
                    {value.map((item) => (
                      <td>{item}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
