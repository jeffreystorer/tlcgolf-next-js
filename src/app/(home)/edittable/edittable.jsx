'use client';
import { useResetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { get, sset } from '@/components/common/utils';
import * as state from '@/store';
import { getSheetUrl } from '@/components/fetchdata/apis/utils';

export default function EditTable({ sheets }) {
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
  sset('isLoggedIn', false);
  window.document.location = sheetURL;

  return false;
}
