import { useRecoilValue } from 'recoil';
import firebaseApp from '@/firebase';
import { ref, getDatabase } from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';
import { Loading } from '@/components/fetchdata/Loading';
import {
  ActiveLineupBox,
  LineupBeingEditedBox,
  SaveLineup,
  SavedLineupsBox,
} from '@/components/lineup';
import { CaptainsDropdown } from '@/components/lineup/dropdowns';
import * as state from '@/store';

export default function LineupPage() {
  const realGhinNumber = useRecoilValue(state.realGhinNumber);
  const captainGhinNumber = useRecoilValue(state.captainGhinNumber);
  const playersInLineup = useRecoilValue(state.playersInLineup);
  const firebaseRef = '"' + captainGhinNumber.toString() + '"';
  const dbRef = ref(getDatabase(firebaseApp), '/' + firebaseRef);
  const [snapshots, loading, error] = useList(dbRef);

  if (error) return <p>{error && <strong>Error: {error}</strong>}</p>;
  if (loading) return <Loading />;

  return (
    <div id='lineup-page'>
      <div id='left'>
        {realGhinNumber === '585871' && (
          <CaptainsDropdown snapshots={snapshots} />
        )}
        {snapshots.length > 0 && <SavedLineupsBox snapshots={snapshots} />}
        <LineupBeingEditedBox snapshots={snapshots} />
      </div>
      {playersInLineup.length > 0 && (
        <div id='right'>
          <ActiveLineupBox snapshots={snapshots} />
        </div>
      )}
    </div>
  );
}
