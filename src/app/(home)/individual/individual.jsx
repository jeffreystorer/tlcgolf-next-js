'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  IndividualTableHeader,
  CHTableBody,
  TSTableBody,
} from '@/components/individual';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { get, set } from '@/components/common/utils';
import { returnAllTeesSelected } from '@/components/individual/utils';
import { getIndividualGHIN } from '@/components/individual/utils';
import * as state from '@/store';

export default function Individual() {
  const router = useRouter();
  const setGolfer_Id = useSetRecoilState(state.golfer_id);
  const courseData = useRecoilValue(state.courseData);
  const foundGolfer = useRecoilValue(state.foundGolfer);
  const roster = useRecoilValue(state.roster);
  console.log('😊😊 courseData', courseData);
  console.log('😊😊 foundGolfer', foundGolfer);
  console.log('😊😊 roster', roster);
  const isLoggedIn = get('isLoggedIn');
  if (!isLoggedIn) {
    router.push('/');
    return false;
  }

  const dataMode = get('dataMode');

  const [index, gender, golfer] = getIndividualGHIN(foundGolfer, roster);
  // eslint-disable-next-line
  const [teeLabels, teeValues, ratings, slopes, pars] = courseData;
  const teesSelected = get('teesSelected');
  const path = `/scores?golfer_id=${golfer_id}`;

  let allTeesSelected = returnAllTeesSelected(teesSelected);

  useEffect(() => {
    const golfer_id = get('ghinNumber');
    setGolfer_Id(ghinNumber);
  }, [get, setGolfer_Id]);

  return (
    <div id='individual'>
      <h2>{golfer}</h2>
      <a href={path}>Click Here for Revision Scores</a>
      <table>
        <caption>Course Handicap</caption>
        <thead>
          <IndividualTableHeader />
        </thead>
        <tbody>
          <CHTableBody
            index={index}
            gender={gender}
            teesSelected={allTeesSelected}
            teeValues={teeValues}
            ratings={ratings}
            slopes={slopes}
            pars={pars}
          />
        </tbody>
      </table>
      <br />
      <table>
        <caption>Score*</caption>
        <thead>
          <IndividualTableHeader />
        </thead>
        <tbody>
          <TSTableBody
            index={index}
            gender={gender}
            teesSelected={allTeesSelected}
            teeValues={teeValues}
            ratings={ratings}
            slopes={slopes}
            pars={pars}
          />
        </tbody>
      </table>
      <br></br>
      <p>
        *Score you must average eight out of your<br></br>last twenty rounds to
        maintain your index.
      </p>
    </div>
  );
}
