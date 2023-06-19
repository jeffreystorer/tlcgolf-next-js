import React from 'react';
import { FetchDataSaturday } from '@/components/fetchdata';
import { set } from '@/components/common/utils';

export default function SaturdayPage() {
  set('dataMode', 'ghin');
  set('ghinNumber', '585871');
  set('lastName', 'Storer');
  return <FetchDataSaturday />;
}
