'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sget } from '@/components/common/utils';

export default function Saturday() {
  const router = useRouter();
  const isLoggedIn = sget('isLoggedIn');
  const path = `/fetchdatasaturday?isLoggedIn=${isLoggedIn}`;
  useEffect(() => {
    router.push(path);
  }, [router, path]);
  return false;
}
