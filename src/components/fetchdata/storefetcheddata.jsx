'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get, set } from '@/components/common/utils';

export function StoreFetchedData({ data, defaultTeesSelected }) {
  const router = useRouter();
  const keys = Object.keys(data);
  const values = Object.values(data);
  keys.map((key, index) => set(key, values[index]));
  set(
    'teesSelected',
    get('teesSelected') ? get('teesSelected') : defaultTeesSelected
  );

  useEffect(() => {
    router.push('/home');
  }, []);

  return false;
}
