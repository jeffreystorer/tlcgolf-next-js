import React from 'react';
import { useRecoilValue } from 'recoil';
import firebaseApp from '@/firebase';
import { ref, getDatabase } from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';
import { TableAll } from '@/components/export';
import * as state from '@/store';
import { set } from '@/components/common/utils';

export default function TableNext() {
  const currentLineupIndex = useRecoilValue(state.currentLineupIndex);
  const ghinNumber = localStorage.getItem('ghinNumber')
    ? JSON.parse(localStorage.getItem('ghinNumber'))
    : '';
  const firebaseRef = '"' + ghinNumber.toString() + '"';
  const dbRef = ref(getDatabase(firebaseApp), '/' + firebaseRef);
  const [snapshots, loading, error] = useList(dbRef);
  if (loading) return null;
  if (error)
    return (
      <p>
        <strong>Error: {error}</strong>
      </p>
    );

  const aLineup = snapshots[currentLineupIndex];
  let savedLineup;
  try {
    savedLineup = aLineup.val();
  } catch (error) {
    window.location = '/';
  }
  set('lineup', savedLineup.lineup);
  set('title', savedLineup.title);
  return (
    <>
      <TableAll />
    </>
  );
}
