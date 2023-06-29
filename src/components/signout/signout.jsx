'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { get, set } from '@/components/common/utils';

export function SignOut() {
  const router = useRouter();
  //values to be preserved
  const ghinNumber = get('ghinNumber');
  const lastName = get('lastName');
  const course = get('course');
  const group = get('group');
  localStorage.clear();
  set('ghinNumber', ghinNumber);
  set('lastName', lastName);
  set('course', course);
  set('group', group);

  useEffect(() => {
    router.push('/');
  }, [router]);

  return false;
}
