'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get } from '@/components/common/utils';

export default function Saturday() {
  const router = useRouter();
  const isLoggedIn = get('isLoggedIn');
  const path = `/fetchdatasaturday?isLoggedIn=${isLoggedIn}`;
  useEffect(() => {
    router.push(path);
  }, [router, path]);
  return false;
}