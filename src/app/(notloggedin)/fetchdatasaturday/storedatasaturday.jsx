'use client';

import { useEffect } from 'react';
import { SaturdayTable } from '@/components/saturday';
import { get, remove, set } from '@/components/common/utils';

export function StoreDataSaturday({ data }) {
  /**
   * const data = {
    ghinNumber: ghinNumber,
    dataMode: dataMode,
    defaultTeesSelected: defaultTeesSelected,
    groups: incomingData.groups,
    allPlayersInTable: allPlayersInTable,
    courseData: courseData,
    isLoggedIn: isLoggedIn,
  };
   */

  const keys = Object.keys(data);
  const values = Object.values(data);
  keys.map((key, index) => set(key, values[index]));
  if (!get('teesSelected')) {
    set('teesSelected', data.defaultTeesSelected);
  }
  remove('defaultTeesSelected');

  return <SaturdayTable />;
}
