import React from 'react';
import { Loading } from '@/components/fetchdata';
import { SaturdayTable } from '@/components/saturday';
import { useFromGHIN } from '@/components/fetchdata/hooks';

export default function FromGHINSaturday() {
  const [loading] = useFromGHIN();

  if (loading) return <Loading />;
  return <SaturdayTable isLoggedIn={false} />;
}
