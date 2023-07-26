'use client';
import { useRouter } from 'next/navigation';
import {
  IndividualTableHeader,
  CHTableBody,
  TSTableBody,
} from '@/components/individual';
import { get, set } from '@/components/common/utils';
import { returnAllTeesSelected } from '@/components/individual/utils';
import { getIndividualGHIN } from '@/components/individual/utils';

export default function Individual() {
  const router = useRouter();
  const isLoggedIn = get('isLoggedIn');
  if (!isLoggedIn) {
    router.push('/');
    return false;
  }

  const dataMode = get('dataMode');
  set('golfer_id', get('ghinNumber'));
  const golfer_id = get('golfer_id');
  const [index, gender, golfer] = getIndividualGHIN(dataMode);
  // eslint-disable-next-line
  const [teeLabels, teeValues, ratings, slopes, pars] = get('courseData');
  const teesSelected = get('teesSelected');
  const path = `/scores?golfer_id=${golfer_id}`;

  let allTeesSelected = returnAllTeesSelected(teesSelected);

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
