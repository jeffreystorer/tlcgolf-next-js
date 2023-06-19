import React from 'react';
import { Loading } from '@/components/fetchdata';
import { useFromGHIN } from '@/components/fetchdata/hooks';

export default function FromGHIN() {
  const [loading] = useFromGHIN();

  if (loading) return <Loading />;

  document.location = '/';
  return null;
}
