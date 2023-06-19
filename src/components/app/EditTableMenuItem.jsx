'use client';

import React from 'react';
import { useResetRecoilState } from 'recoil';
import * as state from '@/store';

import { get } from '@/components/common/utils';

export default function EditTableMenuItem() {
  const resetPlayersInLineup = useResetRecoilState(state.playersInLineup);
  const resetCurrentLineupIndex = useResetRecoilState(state.currentLineupIndex);
  const resetCurrentLineup = useResetRecoilState(state.currentLineup);
  const resetLineupTitle = useResetRecoilState(state.lineupTitle);
  const sheetURL = get('sheetURL');
  resetPlayersInLineup();
  resetCurrentLineupIndex();
  resetCurrentLineup();
  resetLineupTitle();
  document.location = sheetURL;
}
