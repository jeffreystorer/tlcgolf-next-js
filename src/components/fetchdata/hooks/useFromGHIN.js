import React, { useEffect, useState } from 'react';
import {
  addGHINDataToPlayers,
  processCourseDataFromGHIN,
  setCanadianData,
  setFoundGolferAndIsLoggedIn,
} from '@/components/fetchdata/apis/utils';
import {
  useFetchRequests,
  useFindGolfer,
} from '@/components/fetchdata/apis/hooks';

export default function useFromGHIN() {
  const [loading, setLoading] = useState(true);
  const [canadianData, canadianDataLoading] = useFetchRequests('canadian');
  const [courseData, courseDataLoading] = useFetchRequests('course');
  const [ghinData, ghinDataLoading] = useFetchRequests('ghin');
  const [golfer, golferLoading] = useFindGolfer();

  useEffect(() => {
    if (
      !canadianDataLoading &&
      !courseDataLoading &&
      !ghinDataLoading &&
      !golferLoading
    ) {
      processCourseDataFromGHIN(courseData);
      setCanadianData(canadianData);
      addGHINDataToPlayers(ghinData);
      setFoundGolferAndIsLoggedIn(golfer.golfers[0]);
      setLoading(false);
    }
  }, [canadianDataLoading, courseDataLoading, ghinDataLoading, golferLoading]);

  return [loading];
}
