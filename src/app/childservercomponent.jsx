import { v4 as uuidv4 } from 'uuid';

import {
  BASE_URL,
  SHEET_ID,
  BATCH_KEY,
} from '@/components/fetchdata/apis/constants';
import { GolferApi } from '@/components/fetchdata/apis';

async function getSheetsData(ghinNumber) {
  const BATCH_URL =
    BASE_URL +
    SHEET_ID +
    '/values:batchGet?ranges=Schedules&ranges=Tutorials&ranges=Bets&ranges=Captains&ranges=GHIN_Numbers&ranges=Course_Data_From_GHIN&ranges=' +
    ghinNumber +
    BATCH_KEY;
  const res = await fetch(BATCH_URL);
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

export default async function ServerComponent({ params }) {
  const ghinNumber = params.ghinNumber;
  const sheetsData = await getSheetsData(ghinNumber);
  const token = await getToken();
  return (
    <>
      <h1>Data</h1>
      <h2>Token</h2>
      <p>{token}</p>
      <h2>Sheets Data</h2>
      <h3>Individual</h3>
      <table>
        <thead>
          <tr>
            {sheetsData.valueRanges[6].values
              .filter((value, index) => index === 0)
              .map((value) => value.map((item) => <th>{item}</th>))}
          </tr>
        </thead>

        <tbody>
          {sheetsData.valueRanges[6].values
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
      <h3>Schedules</h3>

      <table>
        <thead>
          <tr>
            {sheetsData.valueRanges[0].values
              .filter((value, index) => index === 0)
              .map((value) => value.map((item) => <th>{item}</th>))}
          </tr>
        </thead>

        <tbody>
          {sheetsData.valueRanges[0].values
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
      <h3>Tutorials</h3>

      <table>
        <thead>
          <tr>
            {sheetsData.valueRanges[1].values
              .filter((value, index) => index === 0)
              .map((value) => value.map((item) => <th>{item}</th>))}
          </tr>
        </thead>

        <tbody>
          {sheetsData.valueRanges[1].values
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
      <h3>Bets</h3>

      <table>
        <tbody>
          {sheetsData.valueRanges[2].values.map((value) => (
            <tr>
              {value.map((item) => (
                <td>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Captains</h3>

      <table>
        <thead>
          <tr>
            {sheetsData.valueRanges[3].values
              .filter((value, index) => index === 0)
              .map((value) => value.map((item) => <th>{item}</th>))}
          </tr>
        </thead>

        <tbody>
          {sheetsData.valueRanges[3].values
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
      <h3>Roster</h3>

      <table>
        <thead>
          <tr>
            {sheetsData.valueRanges[4].values
              .filter((value, index) => index === 0)
              .map((value) =>
                value
                  .filter((item, index) => index < 6)
                  .map((item) => <th>{item}</th>)
              )}
          </tr>
        </thead>

        <tbody>
          {sheetsData.valueRanges[4].values
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
      <h3>Course Data</h3>

      <table>
        <thead>
          <tr>
            {sheetsData.valueRanges[5].values
              .filter((value, index) => index === 0)
              .map((value) => value.map((item) => <th>{item}</th>))}
          </tr>
        </thead>

        <tbody>
          {sheetsData.valueRanges[5].values
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
  );
}
