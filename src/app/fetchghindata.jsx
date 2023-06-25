//TODO Add loading and error components?

import { GolferApi } from '@/components/fetchdata/apis';
import { COURSE_IDS } from '@/components/common/data';
import {
  BASE_URL,
  SHEET_ID,
  BATCH_KEY,
  WEDNESDAY_URL,
} from '@/components/fetchdata/apis/constants';
import { GolferApi } from '@/components/fetchdata/apis';
import {
  aGender,
  processCourseDataFromGHIN,
  getGenderFromRoster,
  getWednesdaySchedules,
  getCourseData,
  getDefaultTeesSelected,
  getSchedules,
  addGHINDataToPlayers,
  setCanadianData,
} from '@/components/fetchdata/apis/utils';

async function getBatchData(ghinNumber) {
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
async function getToken() {
  const GHIN_PASSWORD = process.env.NEXT_PUBLIC_GHIN_PASSWORD;
  const res = await GolferApi.login(GHIN_PASSWORD, '585871');
  if (!res.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch token');
  }

  return res.data.golfer_user.golfer_user_token;
}
async function getWednesdayData() {
  const res = await fetch(WEDNESDAY_URL, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch wednesdayData');
  }

  return res.json();
}
async function getCourseData(course_id, token) {
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
async function getCanadianData(cardNo) {
  const url = `https://nextjs-cors-anywhere.vercel.app/api?endpoint=https://scg.golfcanada.ca/api/members/search?text=${cardNo}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch canadianData');
  }

  return res.json();
}

export default async function FetchDataFromGHIN({ data }) {
  /**
   * data
   *   ghinNumber
   *   lastName
   *   dataMode
   *   groups
   *   allPlayersInTable  }
   */
  const batchData = getBatchData();
  const tokenData = getToken();
  const wednesdayData = getWednesdayData();
  const [batch, token, wednesday] = await Promise.all([
    batchData,
    tokenData,
    wednesday,
  ]);

  let coursesDatas = [];
  COURSE_IDS.forEach(createDataItem);
  function createDataItem(item) {
    const itemData = getCourseData(item, token);
    coursesDatas.push(itemData);
  }
  const courses = await Promise.all(coursesDatas);

  const foundGolferData = await findGolfer(data.ghinNumber, token);

  const captains = batch.valueRanges[0].values;
  const allSchedules = batch.valueRanges[1].values;
  const bets = batch.valueRanges[2].values;
  const roster = batch.valueRanges[3].values;
  const courseDataFromGHIN = batch.valueRanges[4].values;
  const foundGolfer = foundGolferData.golfers[0];
  const wednesdayScheduleValues = wednesday.values;
  const [hasSchedule, schedules] = getSchedules(ghinNumber, allSchedules);
  let wednesdaySchedules = [];
  if (ghinNumber === '585871')
    wednesdaySchedules = setWednesdaySchedules(wednesdayScheduleValues);
  let courseData;
  dataMode === 'ghin'
    ? (courseData = processCourseDataFromGHIN(data.courses))
    : (courseData = getCourseData(courseDataFromGHIN));
  let gender;
  dataMode === 'ghin'
    ? (gender = foundGolfer.gender)
    : (gender = aGender(roster, ghinNumber));
  const defaultTeesSelected = getDefaultTeesSelected(gender);

  const ghinNumbers = data.allPlayersInTable.map((player) => player[0]);

  let ghinDatas = [];
  ghinNumbers.forEach(createDataItem);
  function createDataItem(item) {
    const itemData = findGolfer(item, token);
    ghinDatas.push(itemData);
  }

  const lastNames = data.allPlayersInTable.map((player) => player[2]);
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
  let rawCanadianData = [];
  data.canadian.map((item) => rawCanadianData.push(item.members[0]));
  let ghinData = [];
  data.foundGolfers.map((item) => ghinData.push(item.golfers[0]));
  const canandianData = getCanadianData(rawCanadianData);
  const allPlayersInTable = addGHINDataToPlayers(
    roster,
    data.allPlayersInTable,
    canadianData,
    ghinData
  );

  const data = {
    ghinNumber: ghinNumber,
    lastName: lastName,
    dataMode: dataMode,
    hasSchedule: hasSchedule,
    schedules: schedules,
    wednesdaySchedules: wednesdaySchedules,
    courses: courses,
    groups: groups,
    allPlayersInTable: allPlayersInTable,
    courseData: courseData,
    isLoggedIn: 'true',
  };

  return <StoreFetchedData data={(data, defaultTeesSelected)} />;
}
