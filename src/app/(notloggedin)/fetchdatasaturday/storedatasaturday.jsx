'use client';

import { useEffect } from 'react';
import { SaturdayTable } from '@/components/saturday';
import { get, remove, set, sset } from '@/components/common/utils';

//TODO: Need to separate saturday values
export function StoreDataSaturday({ data }) {
  /**
   * const data = {
   * local: {
    ghinNumber: ghinNumber,
    dataMode: dataMode,
    defaultTeesSelected: defaultTeesSelected,
    groups: incomingData.groups,
    allPlayersInTable: allPlayersInTable,
    courseData: courseData,
   },
       isLoggedIn: isLoggedIn,
  };
   */

  const keys = Object.keys(data.local);
  const values = Object.values(data.loca);
  keys.map((key, index) => set(key, values[index]));
  if (!get('teesSelected')) {
    set('teesSelected', data.local.defaultTeesSelected);
  }
  remove('defaultTeesSelected');
  sset('isLoggedIn', data.isLoggedIn);

  return <SaturdayTable />;
}
