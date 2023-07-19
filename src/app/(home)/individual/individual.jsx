'use client';
import { useRouter } from 'next/navigation';
import {
  IndividualTableHeader,
  CHTableBody,
  TSTableBody,
} from '@/components/individual';
import { get, set } from '@/components/common/utils';
import { returnAllTeesSelected } from '@/app/(home)/individual/returnAllTeesSelected';
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
  const [index, gender, golfer] = getIndividualGHIN(dataMode);
  // eslint-disable-next-line
  const [teeLabels, teeValues, ratings, slopes, pars] = get('courseData');
  const teesSelected = get('teesSelected');
  function onClick() {
    router.push('/scores');
  }

  let allTeesSelected = returnAllTeesSelected(teesSelected);

  return (
    <div id='individual'>
      <h2>{golfer}</h2>
      <a href='/scores'>Click Here for Revision Scores</a>
      <br />
      <br />
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