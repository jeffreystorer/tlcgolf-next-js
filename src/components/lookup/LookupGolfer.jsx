import React from 'react';
import { Loading } from '@/components/fetchdata';
import { useLookupGolfer } from '@/components/lookup/hooks';

export default function LookupGolfer() {
  const [loading] = useLookupGolfer();

  if (loading) return <Loading />;

  document.location = '/ghininfo';

  return null;
}
