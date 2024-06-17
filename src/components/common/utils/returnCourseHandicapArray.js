import { courses, genderIndex } from '@/components/common/data';
import {
  buildTeeArray,
  get,
  setRatingSlopePar,
} from '@/components/common/utils';

export default function returnCourseHandicapArray(
  courseData,
  gender,
  strHcpIndex,
  course,
  teesSelectedCourse
) {
  if (!gender) gender = 'M';
  // eslint-disable-next-line
  const [teeLabels, teeValues, ratings, slopes, pars] = courseData;
  let hcpIndex = [];
  if (strHcpIndex !== 'no index') hcpIndex = parseFloat(strHcpIndex);
  let teesSelectedArray = buildTeeArray(teesSelectedCourse);
  let chArray = [];
  const courseIndex = courses.indexOf(course);
  let i;
  for (i = 0; i < teesSelectedArray.length; i++) {
    let teeIndex = teeValues[genderIndex[gender]][courseIndex].indexOf(
      teesSelectedArray[i]
    );
    const [rating, slope, par] = setRatingSlopePar(
      ratings,
      slopes,
      pars,
      courseIndex,
      teeIndex,
      gender
    );
    let ch = '-';
    if (teeIndex > -1) ch = doMath(rating, slope, par);
    if (ch < 0) {
      ch = '+' + (0 - ch).toString();
    }
    chArray.push(ch);
  }
  return chArray;

  //compute the course handicap
  function doMath(rating, slope, par) {
    if (strHcpIndex === 'no index') {
      return '0';
    } else {
      return Math.round(hcpIndex * (slope / 113) + (rating*1000 - par*1000)/1000);
    }
  }
}
