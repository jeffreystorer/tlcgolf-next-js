'use client';
import { useRouter } from 'next/navigation'
import { get, set } from '@/components/common/utils'
import '@/app/globals.css'

export function IsLoggedIn({ captains }) {
/**
 * captains is array of {ghinNumber:   , lastName:} 
 */
  const router = useRouter();
  const isLoggedIn = get('isLoggedIn');
  const ghinNumber = get('ghinNumber') ? get('ghinNumber') : '';
  const dataMode = get('dataMode') ? get('dataMode') : '';
  if (isLoggedIn === 'true') {
		const path = `/fetchdata?ghinNumber=${ghinNumber}&dataMode=${dataMode}`;
		router.push(path);
		return;
  } else {
	router.push('/signin?captains=captains')
  }

  return false;
}