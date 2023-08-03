'use client';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import firebaseApp from '@/firebase';
import { ref, getDatabase } from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';
import {
  ActiveLineupBox,
  LineupBeingEditedBox,
  SaveLineup,
  SavedLineupsBox,
} from '@/components/lineup';
import { CaptainsDropdown } from '@/components/lineup/dropdowns';
import { GroupAndCourseDropdowns } from '@/components/common';
import {
  sget,
  returnDisplayNumber,
  returnHasMultipleGroups,
} from '@/components/common/utils';
import * as state from '@/store';

export default function LineupPage() {
  const groups = useRecoilValue(state.groups);
  const courseData = useRecoilValue(state.courseData);
  const hasMultipleGroups = returnHasMultipleGroups(groups);
  const router = useRouter();
  const course = useRecoilValue(state.course);
  const group = useRecoilValue(state.group);
  const isLoggedIn = sget('isLoggedIn');
  const linkTime = useRecoilValue(state.linkTime);
  const realGhinNumber = useRecoilValue(state.realGhinNumber);
  const captainGhinNumber = useRecoilValue(state.captainGhinNumber);
  const playersInLineup = useRecoilValue(state.playersInLineup);
  const firebaseRef = '"' + captainGhinNumber.toString() + '"';
  const dbRef = ref(getDatabase(firebaseApp), '/' + firebaseRef);
  const [snapshots, loading, error] = useList(dbRef);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [router, isLoggedIn]);

  if (error) return <p>{error && <strong>Error: {error}</strong>}</p>;
  if (loading) return null;

  let displayNumber = returnDisplayNumber(course, group, groups);

  switch (displayNumber) {
    case 1:
      return (
        <>
          {hasMultipleGroups ? (
            <p>
              Click on the dropdown boxes below
              <br />
              to select a group and a course.
            </p>
          ) : (
            <p>
              Click on the dropdown box below
              <br />
              to select a course.
            </p>
          )}
          <GroupAndCourseDropdowns />
        </>
      );
    case 2:
      return (
        <div className='lineup-page'>
          <div id='left'>
            {realGhinNumber === '585871' && (
              <CaptainsDropdown snapshots={snapshots} />
            )}
            {snapshots.length > 0 && <SavedLineupsBox snapshots={snapshots} />}
            <LineupBeingEditedBox snapshots={snapshots} />
          </div>
          {playersInLineup.length > 0 && linkTime !== 'Set Link Time Above' && (
            <div id='right'>
              <ActiveLineupBox snapshots={snapshots} />
            </div>
          )}
        </div>
      );
    default:
      return undefined;
  }
}
