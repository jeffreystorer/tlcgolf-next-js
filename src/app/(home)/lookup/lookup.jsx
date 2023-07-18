'use client';
import { useRouter } from 'next/navigation';
import { get } from '@/components/common/utils';

export default function LookUp() {
  const router = useRouter();
  const isLoggedIn = get('isLoggedIn');
  if (!isLoggedIn) {
    router.push('/');
    return false;
  }
  return <h1>LookUp Page</h1>;
}
