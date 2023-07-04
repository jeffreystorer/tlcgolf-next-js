//TODO Add loading and error components?
import { FetchRest } from '@/app/fetchdata/fetchrest';
import { GolferApi } from '@/components/fetchdata/apis';
import {
  BASE_URL,
  SHEET_ID,
  KEY,
} from '@/components/fetchdata/apis/constants';
import {
  addGHINDataToPlayers,
  getCanadianData,
} from '@/components/fetchdata/apis/utils';

async function fetchRoster() {
  const ROSTER_URL =
    BASE_URL +
    SHEET_ID +
    '/values/GHIN_Numbers' + 
    KEY;
  const res = await fetch(ROSTER_URL, { cache: 'no-store'});
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch rosterData');
  }

  return res.json();
}
async function fetchToken() {
  const GHIN_PASSWORD = process.env.NEXT_GHIN_PASSWORD;
  const res = await GolferApi.login(GHIN_PASSWORD, '585871');
  if (!res.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch token');
  }

  return res.data.golfer_user.golfer_user_token;
}
async function findGolfer(ghinNumber, token) {
  const res = await GolferApi.findGolfer(ghinNumber, token);
  if (!res.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to find golfer');
  }

  return res.data;
}
async function fetchCanadianData(cardNo) {
  /* const url = `https://nextjs-cors-anywhere.vercel.app/api?endpoint=https://scg.golfcanada.ca/api/members/search?text=${cardNo}`; */
  const url = `https://scg.golfcanada.ca/api/members/search?text=${cardNo}`;
  const res = await fetch(url, { cache: 'no-store'});
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch canadianData');
  }

  return res.json();
}

export async function FetchGHIN({ incomingData }) {
  /**
   * incomingData:
    ghinNumber: ghinNumber,
    dataMode: dataMode,
    groups: groups,
    rawAllPlayersInTable: rawAllPlayersInTable,
   */

  const ghinNumber = incomingData.ghinNumber;
  const dataMode = incomingData.dataMode;
  const groups = incomingData.groups;
  const rawAllPlayersInTable = incomingData.rawAllPlayersInTable;
 
  const rosterData = fetchRoster();
  const tokenData = fetchToken();
  const [roster, token ] = await Promise.all([rosterData, tokenData]);

  const ghinNumbers = rawAllPlayersInTable.map((player) => player[0]);
  let ghinDatas = [];
  ghinNumbers.forEach(createGHINDataItem);
  function createGHINDataItem(item) {
    const ghinData = findGolfer(item, token);
    ghinDatas.push(ghinData);
  }
  const foundGolfers = await Promise.all(ghinDatas);   
  let ghinData = [];
  foundGolfers.map((item) => ghinData.push(item.golfers[0]));  

  const lastNames = rawAllPlayersInTable.map((player) => player[1]); 
  let canadianDatas = [];
  lastNames.forEach(createCanadianItem);
  function createCanadianItem(item) {
    const parenIndex = item.indexOf('(');
    if (parenIndex > -1) {
      const paren = item.substr(parenIndex);
      const parenType = paren.substr(1, 1);
      if (parenType === 'C') {
        const lastCPart = paren.substring(3);
        let cardNo = lastCPart.replace(')', '');
        const canadianData = fetchCanadianData(cardNo);
        canadianDatas.push(canadianData);
      }
    }
  } 

  const canadians = await Promise.all(canadianDatas);
  let rawCanadianData = [];
  canadians.map((item) => rawCanadianData.push(item.members[0]));
  const canadianData = getCanadianData(rawCanadianData);

 const allPlayersInTable = addGHINDataToPlayers(
    roster,
    rawAllPlayersInTable,
    canadianData,
    ghinData,
  );

  const data = {
    ghinNumber: ghinNumber,
    dataMode: dataMode,
    allPlayersInTable: allPlayersInTable,
    groups: groups,
    token: token,
    roster: roster,
  };

  return <FetchRest incomingData={data} />;  
}
