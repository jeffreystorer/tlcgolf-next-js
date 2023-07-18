'use client';
import { useRouter } from 'next/navigation';
import { get } from '@/components/common/utils';

export default function Tutorials({ tutorialList }) {
  const router = useRouter();
  const isLoggedIn = get('isLoggedIn');
  if (!isLoggedIn) {
    router.push('/');
    return false;
  }
  return <>{tutorialList}</>;
}
