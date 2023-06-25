'use client';
import { useRouter } from 'next/navigation';
import { get } from '@/components/common/utils';

export function GetLoggedIn() {
  const router = useRouter();
  const ghinNumber = get('ghinNumber') ? get('ghinNumber') : '';
  const lastName = get('lastName') ? get('lastName') : '';
  const dataMode = get('dataMode') ? get('dataMode') : '';
  const courses = get('courses') ? get('courses') : '';
  const isLoggedIn = get('isLoggedIn');
  if (isLoggedIn === 'true') {
    router.push(`/fetchghindata?ghinNumber=${ghinNumber}&dataMode=${dataMode}&courses=${courses}`);
  } else {
    router.push(`/signin?lastName=${lastName}`);
  }
}
