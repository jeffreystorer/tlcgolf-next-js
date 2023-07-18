'use client';
import { useResetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { get, set } from '@/components/common/utils';
import * as state from '@/store';
import { getSheetUrl } from '@/components/fetchdata/apis/utils';

export function EditTable({sheets}) {
  const router = useRouter();
  const ghinNumber = get('ghinNumber');
  const resetPlayersInLineup = useResetRecoilState(state.playersInLineup);
  const resetCurrentLineupIndex = useResetRecoilState(state.currentLineupIndex);
  const resetCurrentLineup = useResetRecoilState(state.currentLineup);
  const resetLineupTitle = useResetRecoilState(state.lineupTitle);
  const sheetURL = getSheetUrl(ghinNumber, sheets);
  resetPlayersInLineup();
  resetCurrentLineupIndex();
  resetCurrentLineup();
  resetLineupTitle();
  set('isLoggedIn',false);
  window.document.location = sheetURL;
  return false;
}
