'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { get} from '@/components/common/utils'
import '@/app/globals.css'

export default function Page() {
  const router = useRouter();
  const isLoggedIn = get('isLoggedIn');

  useEffect(() => {
    if (isLoggedIn) {
      const ghinNumber = get('ghinNumber') ? get('ghinNumber') : '';
      const dataMode = get('dataMode') ? get('dataMode') : '';
      const path = `/fetchdata?ghinNumber=${ghinNumber}&dataMode=${dataMode}`;
      router.push(path);
      return;
    } else {
	    router.push('/signin')
    } 
  
   
  }, [isLoggedIn, router])

  return false;
}