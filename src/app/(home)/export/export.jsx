'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table } from '@/components/export';
import { sget } from '@/components/common/utils';

export default function Export() {
  const router = useRouter();
  const isLoggedIn = sget('isLoggedIn');
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [router, isLoggedIn]);
  return <Table />;
}
