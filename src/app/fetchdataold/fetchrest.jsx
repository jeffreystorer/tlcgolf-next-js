//TODO Add loading and error components?
import { StoreData } from '@/app/fetchdata/storedata'
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
} from '@/components/fetchdata/apis/utils';


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

export async function FetchRest({ incomingData }) {
  /**
   * incomingData = {
    ghinNumber: ghinNumber,
    dataMode: dataMode,
    allPlayersInTable: allPlayersInTable,
    groups: groups,
    token: token,
    roster: roster,
  };
   */
  const ghinNumber = incomingData.ghinNumber;
  const dataMode = incomingData.dataMode;
  const allPlayersInTable = incomingData.allPlayersInTable;
  const groups = incomingData.groups;
  const token = incomingData.token;
  const roster = incomingData.roster;

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
  const courseDataFromGHIN = batch.valueRanges[3].values;
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
