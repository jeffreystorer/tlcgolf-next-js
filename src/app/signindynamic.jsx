'use client';
import dynamic from 'next/dynamic';
const SignIn = dynamic(() => import('@/app/Signin'), {
  ssr: false,
});

export default function SignInDynamic({ captains }) {
  return <SignIn captains={captains} />;
}
