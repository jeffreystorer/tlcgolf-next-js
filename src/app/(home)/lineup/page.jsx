'use client';
import dynamic from 'next/dynamic';
const LineupGateway = dynamic(() => import('@/app/(home)/lineup/lineupgateway'), {
  ssr: false,
});
import { useRouter } from 'next/navigation';
import { sget } from '@/components/common/utils'

export default function Page() {
  const router = useRouter();
  const isLoggedIn = sget('isLoggedIn');
  if (!isLoggedIn) {
    router.push('/');
    return false;
  }
  return <LineupGateway />;
}
