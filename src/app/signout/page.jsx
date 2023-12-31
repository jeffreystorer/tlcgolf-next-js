'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clear, sclear, get, set } from '@/components/common/utils';

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    //values to be preserved
    const ghinNumber = get('ghinNumber') ? get('ghinNumber') : '';
    const lastName = get('lastName') ? get('lastName') : '';
    const course = get('course') ? get('course') : '';
    const group = get('group') ? get('group') : '';
    const teesSelected = get('teesSelected') ? get('teesSelected') : '';
    clear();
    sclear();
    set('ghinNumber', ghinNumber);
    set('lastName', lastName);
    set('course', course);
    set('group', group);
    set('teesSelected', teesSelected);
    router.push('/');
  }, [router]);

  return false;
}
