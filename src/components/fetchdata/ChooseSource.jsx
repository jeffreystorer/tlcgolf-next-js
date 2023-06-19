import React from 'react';
import { FromGHIN, FromRoster } from '@/components/fetchdata';
import { get } from '@/components/common/utils';
import { setFoundGolferAndIsLoggedIn } from '@/components/fetchdata/apis/utils';

export default function ChooseSource() {
  const dataMode = get('dataMode');
  if (dataMode === 'roster') setFoundGolferAndIsLoggedIn(null);

  return <>{dataMode === 'ghin' ? <FromGHIN /> : <FromRoster />}</>;
}
