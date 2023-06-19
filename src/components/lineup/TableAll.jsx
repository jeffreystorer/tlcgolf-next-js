import React from 'react';
import { useRecoilValue } from 'recoil';
import firebaseApp from '@/firebase';
import { ref, getDatabase } from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';
import { Loading } from '@/components/fetchdata';
import {
  ActiveLineup,
  LineupBeingEditedBox,
  SaveLineupBox,
  SavedLineupsBox,
} from '@/components/lineup';
import { CaptainsDropdown } from '@/components/lineup/dropdowns';
import * as state from '@/store';

export default function TableAll() {
  const realGhinNumber = useRecoilValue(state.realGhinNumber);
  const captainGhinNumber = useRecoilValue(state.captainGhinNumber);
  const firebaseRef = '"' + captainGhinNumber.toString() + '"';
  const dbRef = ref(getDatabase(firebaseApp), '/' + firebaseRef);
  const [snapshots, loading, error] = useList(dbRef);

  if (error) return <p>{error && <strong>Error: {error}</strong>}</p>;
  if (loading) return <Loading />;

  return (
    <>
      <div className='div--center'>
        <br />
        {realGhinNumber === '585871' && (
          <>
            <CaptainsDropdown snapshots={snapshots} />
            <br />
            <br />
          </>
        )}
        {snapshots.length > 0 && (
          <>
            {' '}
            <SavedLineupsBox snapshots={snapshots} />
            <br />{' '}
          </>
        )}
        <LineupBeingEditedBox snapshots={snapshots} />
        <ActiveLineup />
        <br />
        <SaveLineupBox snapshots={snapshots} />
      </div>
    </>
  );
}
