//import { Temp } from './temp';
import { StoreFetchedDataStepThree } from '@/components/fetchdata/storefetcheddatastepthree';
import { GolferApi } from '@/components/fetchdata/apis';
import { buildCanadianRequests } from '@/components/fetchdata/apis/utils/buildCanadianRequests';

async function getCanadianData(cardNo) {
  const url = `https://nextjs-cors-anywhere.vercel.app/api?endpoint=https://scg.golfcanada.ca/api/members/search?text=${cardNo}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch canadianData');
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

export default async function FetchDataStepThreePage({ searchParams }) {
  /**
   * searchParams = .token, .ghinNumberArray, .lastNamesArray
   */
  const ghinNumberArray = decodeURIComponent(
    JSON.parse(searchParams.ghinNumberArray)
  );

  const ghinNumbers = ghinNumberArray.split(',');

  let ghinDatas = [];
  ghinNumbers.forEach(createDataItem);
  function createDataItem(item) {
    const itemData = findGolfer(item, searchParams.token);
    ghinDatas.push(itemData);
  }

  const lastNamesArray = decodeURIComponent(
    JSON.parse(searchParams.lastNamesArray)
  );
  const lastNames = lastNamesArray.split(',');
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
        const canadianData = getCanadianData(cardNo);
        canadianDatas.push(canadianData);
      }
    }
  }

  const foundGolfers = await Promise.all(ghinDatas);
  const canadian = await Promise.all(canadianDatas);
  const data = {
    canadian: canadian,
    foundGolfers: foundGolfers,
  };

  /* return <Temp data={data} />; */
  return <StoreFetchedDataStepThree data={data} />;
}
