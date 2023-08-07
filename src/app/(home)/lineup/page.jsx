'use client';
import dynamic from 'next/dynamic';
const LineupGatewayDynamic = dynamic(() => import('@/app/(home)/lineup/lineupgatewaydynamic'), {
  ssr: false,
});

export default function Page() {  
  return <LineupGatewayDynamic />;
}
