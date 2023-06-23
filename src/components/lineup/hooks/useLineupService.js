import { useResetRecoilState, useRecoilValue } from 'recoil';
import firebaseApp from '@/firebase';
import { child, getDatabase, ref, push, remove } from 'firebase/database';
import * as state from '@/store';

export default function useLineupService() {
  const realGhinNumber = useRecoilValue(state.realGhinNumber);
  const firebaseRef = '"' + realGhinNumber.toString() + '"';
  const path = '/' + firebaseRef;
  const dbRef = ref(getDatabase(firebaseApp), path);
  const captainGhinNumber = useRecoilValue(state.captainGhinNumber);
  const resetCaptainGhinNumber = useResetRecoilState(state.captainGhinNumber);

  function createLineup(data) {
    push(dbRef, data);
    resetCaptainGhinNumber();
  }

  function deleteLineup(key) {
    if (realGhinNumber === captainGhinNumber) remove(child(dbRef, '/' + key));
  }

  function deleteAllLineups() {
    if (realGhinNumber === captainGhinNumber) remove(dbRef);
  }

  return { createLineup, deleteLineup, deleteAllLineups };
}
