'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get } from '@/components/common/utils';

export default function Lineup() {
  const router = useRouter();
  const isLoggedIn = get('isLoggedIn');
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [router, isLoggedIn]);

  return <h1>Lineup Page</h1>;
}
