//TODO Add loading and error components?
import { StoreData } from '@/app/fetchdata/storedata'
import { GolferApi, CourseApi} from '@/components/fetchdata/apis';
import { COURSE_IDS } from '@/components/common/data';
import { aGender } from '@/components/common/utils'
import {
  BASE_URL,
  SHEET_ID,
  KEY,
  BATCH_KEY,
  WEDNESDAY_URL,
} from '@/components/fetchdata/apis/constants';
import {
  getPlayersAndGroups,
  processCourseDataFromGHIN,
  getWednesdaySchedules,
  getCaptains,
  getCourseData,
  getDefaultTeesSelected,
  getSchedules,
  addGHINDataToPlayers,
  getCanadianData,
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
}
async function fetchBatchData(ghinNumber) {
  const BATCH_URL =
    BASE_URL +
    SHEET_ID +
    '/values:batchGet?ranges=Captains&ranges=Schedules&ranges=Bets&ranges=GHIN_Numbers&ranges=Course_Data_From_GHIN'  +
    BATCH_KEY;
  const res = await fetch(BATCH_URL, { cache: 'no-store'});
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch batchData');
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
  const res = await fetch(WEDNESDAY_URL, { cache: 'no-store'});
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
  /* const url = `https://nextjs-cors-anywhere.vercel.app/api?endpoint=https://scg.golfcanada.ca/api/members/search?text=${cardNo}`; */
  const url = `https://scg.golfcanada.ca/api/members/search?text=${cardNo}`;
  const res = await fetch(url, { cache: 'no-store'});
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch canadianData');
  }

  return res.json();
}

export default async function Page({searchParams}){
  const ghinNumber = searchParams.ghinNumber;
  const dataMode = searchParams.dataMode
  const tableData = fetchTable(ghinNumber);
  const tokenData = fetchToken();
  const [table, token] = await Promise.all([
    tableData,
    tokenData,
  ]);
  const [groups, rawAllPlayersInTable] = getPlayersAndGroups(table.values);

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

  const batchData = fetchBatchData(ghinNumber);
  const wednesdayData = fetchWednesdayData();
  const [batch, wednesday] = await Promise.all([
    batchData,
    wednesdayData,
  ]);

  let coursesDatas = [];
  COURSE_IDS.forEach(createCoursesDataItem);
  function createCoursesDataItem(item) {
    const itemData = fetchCourseData(item, token);
    coursesDatas.push(itemData);
  }
  const courses = await Promise.all(coursesDatas);

  const foundGolferData = await findGolfer(ghinNumber, token);

  const captains = getCaptains(batch.valueRanges[0].values);
  const allSchedules = batch.valueRanges[1].values;
  const bets = batch.valueRanges[2].values;
  const roster = batch.valueRanges[3].values;
  const courseDataFromGHIN = batch.valueRanges[4].values;
  const foundGolfer = foundGolferData.golfers[0];
  const wednesdayScheduleValues = wednesday.values;
  const [hasSchedule, schedules] = getSchedules(ghinNumber, allSchedules);
  let wednesdaySchedules = [];
  if (ghinNumber === '585871')
    wednesdaySchedules = getWednesdaySchedules(wednesdayScheduleValues);
  function getCaptainObject(ghinNumbers){
      return captains.find(captain => captain.ghinNumber === ghinNumber)
  }
  const lastName = getCaptainObject(ghinNumber).lastName;
  
  let courseData;
  dataMode === 'ghin'
    ? (courseData = processCourseDataFromGHIN(courses))
    : (courseData = getCourseData(courseDataFromGHIN));
  let gender;
  dataMode === 'ghin'
    ? (gender = foundGolfer.gender)
    : (gender = aGender(roster, ghinNumber));
  const defaultTeesSelected = getDefaultTeesSelected(gender);

 const allPlayersInTable = addGHINDataToPlayers(
    roster,
    rawAllPlayersInTable,
    canadianData,
    ghinData,
  );

  const data = {
    ghinNumber: ghinNumber,
    lastName: lastName,
    dataMode: dataMode,
    captains: captains,
    bets: bets, 
    hasSchedule: hasSchedule,
    schedules: schedules,
    foundGolfer: foundGolfer,
    wednesdaySchedules: wednesdaySchedules,
    defaultTeesSelected: defaultTeesSelected,
    groups: groups,
    allPlayersInTable: allPlayersInTable,
    courseData: courseData,
    isLoggedIn: 'true',
  };

  return <StoreData data={data} />;
  
}
