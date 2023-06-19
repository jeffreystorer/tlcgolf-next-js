import React, { useEffect, useState } from 'react';
import { useLookup } from '@/components/fetchdata/apis/hooks';
import { get, set } from '@/components/common/utils';

export default function useLookupGolfer() {
  const [loading, setLoading] = useState(true);
  const ghinNumber = get('ghinNumber');
  const [golfers, golfersLoading] = useLookup();

  useEffect(() => {
    if (!golfersLoading) {
      set('golfers', golfers);
      setLoading(false);
    }
  }, [golfersLoading]);

  return [loading];
}
