'use client';
import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import * as state from '@/store';
import { getSheetUrl } from '@/components/fetchdata/apis/utils';

export function EditTable({sheets}) {
  const router = useRouter();
  const resetPlayersInLineup = useResetRecoilState(state.playersInLineup);
  const resetCurrentLineupIndex = useResetRecoilState(state.currentLineupIndex);
  const resetCurrentLineup = useResetRecoilState(state.currentLineup);
  const resetLineupTitle = useResetRecoilState(state.lineupTitle);
  const sheetURL = getSheetUrl(sheets);

  useEffect(() => {
    resetPlayersInLineup();
    resetCurrentLineupIndex();
    resetCurrentLineup();
    resetLineupTitle();
    window.document.location = sheetURL;
    router.push('/')
    
  }, [
    resetCurrentLineup,
    resetCurrentLineupIndex,
    resetLineupTitle,
    resetPlayersInLineup,
    router,
    sheetURL,
  ]);

  return false;
}
