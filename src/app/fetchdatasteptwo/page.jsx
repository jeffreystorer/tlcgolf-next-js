//import { Temp } from './temp';
import { StoreFetchedDataStepTwo } from '@/components/fetchdata/storefetcheddatasteptwo';
import { COURSE_IDS } from '@/components/common/data';
import {
  BASE_URL,
  SHEET_ID,
  KEY,
  WEDNESDAY_URL,
} from '@/components/fetchdata/apis/constants';
import { GolferApi, CourseApi } from '@/components/fetchdata/apis';

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

async function getCourseData(course_id, token) {
  const res = await CourseApi.getCourseData(course_id, token);
  if (!res.status === 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to get course data');
  }

  return res.data;
}

//TODO: can I combine steps two and three?
export default async function FetchDataStepTwoPage({ searchParams }) {
  /*
   ** searcParams: .token, .ghinNumber
   */
  let coursesDatas = [];
  COURSE_IDS.forEach(createDataItem);
  function createDataItem(item) {
    const itemData = getCourseData(item, searchParams.token);
    coursesDatas.push(itemData);
  }

  const tableData = getTableData(searchParams.ghinNumber);
  const foundGolferData = findGolfer(
    searchParams.ghinNumber,
    searchParams.token
  );
  const wednesdayData = getWednesdayData();
  const [table, foundGolfer, wednesday] = await Promise.all([
    tableData,
    foundGolferData,
    wednesdayData,
  ]);

  const courses = await Promise.all(coursesDatas);

  const data = {
    courses: courses,
    table: table,
    foundGolfer: foundGolfer,
    wednesday: wednesday,
  };

  return <StoreFetchedDataStepTwo data={data} />;
  /* return <Temp data={data} />; */
}
