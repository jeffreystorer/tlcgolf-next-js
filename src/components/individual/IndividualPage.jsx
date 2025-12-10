'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  IndividualTableHeader,
  CHTableBody,
  TSTableBody,
} from '@/components/individual';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useSetAllRecoilState } from '@/components/common/hooks';
import { get, sget } from '@/components/common/utils';
import { returnAllTeesSelected } from '@/components/individual/utils';
import { getIndividualGHIN } from '@/components/individual/utils';
import * as state from '@/store';

export default function IndividualPage() {
  const router = useRouter();
  const courseData = useRecoilValue(state.courseData);
  const foundGolfer = useRecoilValue(state.foundGolfer);
  const roster = get('roster');
  const teesSelected = useRecoilValue(state.teesSelected);
  const golfer_id = get('ghinNumber');

  const isLoggedIn = sget('isLoggedIn');
  if (!isLoggedIn) {
    router.push('/');
    return false;
  }

  const dataMode = get('dataMode');

  const [index, gender, golfer] = getIndividualGHIN(foundGolfer, roster);
  // eslint-disable-next-line
  const [teeLabels, teeValues, ratings, slopes, pars] = courseData;
  const path = `/scores?golfer_id=${golfer_id}`;

  let allTeesSelected = returnAllTeesSelected(teesSelected);

  return (
    <div id='individual'>
      <h2>{golfer}</h2>
      {dataMode === "ghin" && (<a href={path}>Click Here for Revision Scores</a>
  )}
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
