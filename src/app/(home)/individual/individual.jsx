'use client';
import { useRouter } from 'next/navigation';
import { get } from '@/components/common/utils';

export default function Individual() {
  const router = useRouter();
  const isLoggedIn = get('isLoggedIn');
  if (!isLoggedIn) {
    router.push('/');
    return false;
  }
  return <h1>Individual</h1>;
}
