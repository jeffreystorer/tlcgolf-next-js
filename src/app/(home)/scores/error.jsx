'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    router.back();
  }, [router]);

  return false;
}
