'use client';
import { useResetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { get, set } from '@/components/common/utils';
import * as state from '@/store';

export default function Page() {
  const router = useRouter();
  const resetPlayersInLineup = useResetRecoilState(state.playersInLineup);
  const resetCurrentLineupIndex = useResetRecoilState(state.currentLineupIndex);
  const resetCurrentLineup = useResetRecoilState(state.currentLineup);
  const resetLineupTitle = useResetRecoilState(state.lineupTitle);
  resetPlayersInLineup();
  resetCurrentLineupIndex();
  resetCurrentLineup();
  resetLineupTitle();
  set('isLoggedIn',false);
  window.document.location = 'https://docs.google.com/spreadsheets/d/1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg/edit#gid=270710306';
  return false;
}
