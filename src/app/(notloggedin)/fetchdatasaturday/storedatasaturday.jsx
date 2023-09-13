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
    groups: incomingData.groups,
    allPlayersInTable: allPlayersInTable,
    courseData: courseData,
   },
   defaultTeesSelected,
       isLoggedIn: isLoggedIn,
  };
   */

  const keys = Object.keys(data.local);
  const values = Object.values(data.local);
  keys.map((key, index) => set(key, values[index]));
  set('teesSelectedSaturay', data.defaultTeesSelected)
  sset('isLoggedIn', data.isLoggedIn);

  return <SaturdayTable />;
}
