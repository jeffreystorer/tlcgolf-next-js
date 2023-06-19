import React from 'react';
import { FromGHINSaturday, Loading } from '@/components/fetchdata';
import { useFetchDataSaturday } from '@/components/fetchdata/hooks';

export default function FetchDataSaturday() {
  const [loading] = useFetchDataSaturday();

  if (loading) return <Loading />;

  return <FromGHINSaturday />;
}
