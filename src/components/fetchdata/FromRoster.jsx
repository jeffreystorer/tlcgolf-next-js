import React from 'react';
import { Loading } from '@/components/fetchdata';
import { useFromRoster } from '@/components/fetchdata/hooks';

export default function FromRoster() {
  const [loading] = useFromRoster();

  if (loading) return <Loading />;

  document.location = '/';
  return null;
}
