'use client';
import { useEffect }  from 'react'
import { useRouter } from 'next/navigation';
import { get } from '@/components/common/utils';

export function GetIsLoggedIn() {
  const router = useRouter();
  const isLoggedIn = get('isLoggedIn');
  
  useEffect(() => {
    if (isLoggedIn === 'true') {
    const ghinNumber = get('ghinNumber');
    const lastName = get('lastName');
    const dataMode = get('dataMode');
    const groups = get('groups');
    const groupsArray = encodeURIComponent(JSON.stringify(groups));
    const allPlayersInTable = get('allPlayersInTable')
    const allPlayersInTableArray = encodeURIComponent(JSON.stringify(allPlayersInTable));
      router.push(`/fetchdata?ghinNumber=${ghinNumber}&lastname=${lastName}&dataMode=${dataMode}&groupsArray=${groupsArray}&allPlayersInTableArray=${allPlayersInTableArray}`);
    } else {
      router.push('/signin');
    }

  }, [isLoggedIn, router])
  

  return false;
}
