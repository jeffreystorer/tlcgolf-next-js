//TODO Add loading and error components?
import { StoreData } from '@/components/fetchdata/storedata'
import { GolferApi, CourseApi} from '@/components/fetchdata/apis';
import { COURSE_IDS } from '@/components/common/data';
import { aGender } from '@/components/common/utils'
import {
  BASE_URL,
  SHEET_ID,
  BATCH_KEY,
  WEDNESDAY_URL,
} from '@/components/fetchdata/apis/constants';
import {
  processCourseDataFromGHIN,
  getWednesdaySchedules,
  getCaptains,
  getCourseData,
  getDefaultTeesSelected,
  getSchedules,
  addGHINDataToPlayers,
  getCanadianData,
} from '@/components/fetchdata/apis/utils';

async function fetchBatchData(ghinNumber) {
  const BATCH_URL =
    BASE_URL +
    SHEET_ID +
    '/values:batchGet?ranges=Captains&ranges=Schedules&ranges=Bets&ranges=GHIN_Numbers&ranges=Course_Data_From_GHIN' +
    BATCH_KEY;
  const res = await fetch(BATCH_URL, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch sheetsData');
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
async function fetchWednesdayData() {
  const res = await fetch(WEDNESDAY_URL, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch wednesdayData');
  }

  return res.json();
}
async function fetchCourseData(course_id, token) {
  const res = await CourseApi.getCourseData(course_id, token);
  if (!res.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to get course data');
  }

  return res.data;
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
  const url = `https://nextjs-cors-anywhere.vercel.app/api?endpoint=https://scg.golfcanada.ca/api/members/search?text=${cardNo}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch canadianData');
  }

  return res.json();
}

export async function FetchData({ incomingData }) {
  /**
   * incomingdata
   *   ghinNumber
   *   lastName
   *   dataMode
   *   groups
   *   allPlayersInTable
   */
  const batchData = fetchBatchData();
  const tokenData = fetchToken();
  const wednesdayData = fetchWednesdayData();
  const [batch, token, wednesday] = await Promise.all([
    batchData,
    tokenData,
    wednesdayData,
  ]);

  let coursesDatas = [];
  COURSE_IDS.forEach(createCoursesDataItem);
  function createCoursesDataItem(item) {
    const itemData = fetchCourseData(item, token);
    coursesDatas.push(itemData);
  }
  const courses = await Promise.all(coursesDatas);

  const foundGolferData = await findGolfer(incomingData.ghinNumber, token);

  const captains = getCaptains(batch.valueRanges[0].values);
  const allSchedules = batch.valueRanges[1].values;
  const bets = batch.valueRanges[2].values;
  const roster = batch.valueRanges[3].values;
  const courseDataFromGHIN = batch.valueRanges[4].values;
  const foundGolfer = foundGolferData.golfers[0];
  const wednesdayScheduleValues = wednesday.values;
  const [hasSchedule, schedules] = getSchedules(incomingData.ghinNumber, allSchedules);
  let wednesdaySchedules = [];
  if (incomingData.ghinNumber === '585871')
    wednesdaySchedules = getWednesdaySchedules(wednesdayScheduleValues);
  let courseData;
  incomingData.dataMode === 'ghin'
    ? (courseData = processCourseDataFromGHIN(courses))
    : (courseData = getCourseData(courseDataFromGHIN));
  let gender;
  incomingData.dataMode === 'ghin'
    ? (gender = foundGolfer.gender)
    : (gender = aGender(roster, ghinNumber));
  const defaultTeesSelected = getDefaultTeesSelected(gender);

  const ghinNumbers = incomingData.allPlayersInTable.map((player) => player[0]);

  let ghinDatas = [];
  ghinNumbers.forEach(createGHINDataItem);
  function createGHINDataItem(item) {
    const ghinData = findGolfer(item, token);
    ghinDatas.push(ghinData);
  }
  const foundGolfers = await Promise.all(ghinDatas);

  const lastNames = incomingData.allPlayersInTable.map((player) => player[1]);

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
  let ghinData = [];
  foundGolfers.map((item) => ghinData.push(item.golfers[0]));

  const canadians = await Promise.all(canadianDatas);
  let rawCanadianData = [];
  canadians.map((item) => rawCanadianData.push(item.members[0]));
  const canadianData = getCanadianData(rawCanadianData);

 const allPlayersInTable = addGHINDataToPlayers(
    roster,
    incomingData.allPlayersInTable,
    canadianData,
    ghinData
  );

  const data = {
    ghinNumber: incomingData.ghinNumber,
    lastName: incomingData.lastName,
    dataMode: incomingData.dataMode,
    captains: captains,
    bets: bets, 
    hasSchedule: hasSchedule,
    schedules: schedules,
    wednesdaySchedules: wednesdaySchedules,
    defaultTeesSelected: defaultTeesSelected,
    groups: incomingData.groups,
    allPlayersInTable: allPlayersInTable,
    courseData: courseData,
    isLoggedIn: 'true',
  };

  return <StoreData data={data} />;
  
}
