import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  WEDNESDAY_URL,
  SHEET_URL,
  BASE_URL,
  SHEET_ID,
  BATCH_KEY,
} from '@/components/fetchdata/apis/constants';
import {
  setCaptains,
  setWednesdaySchedules,
  setTutorials,
  setBets,
  setSchedules,
  setSheetUrl,
  setCourseData,
  setFoundGolferAndIsLoggedIn,
  setPlayersAndGroups,
} from '@/components/fetchdata/apis/utils';
import {
  useFetchSheetsData,
  useFetchToken,
} from '@/components/fetchdata/apis/hooks';
import { get, set } from '@/components/common/utils';

export default function useFetchData() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const ghinNumber = get('ghinNumber');
  const dataMode = get('dataMode');
  const BATCH_URL =
    BASE_URL +
    SHEET_ID +
    '/values:batchGet?ranges=Schedules&ranges=Tutorials&ranges=Bets&ranges=Captains&ranges=GHIN_Numbers&ranges=Course_Data_From_GHIN&ranges=' +
    ghinNumber +
    BATCH_KEY;
  const [wednesdayValues, wednesdayLoading] = useFetchSheetsData(
    WEDNESDAY_URL,
    'one'
  );
  const [batchData, batchLoading] = useFetchSheetsData(BATCH_URL, 'many');
  const [sheetsData, sheetsLoading] = useFetchSheetsData(SHEET_URL, 'many');
  const [token, tokenLoading] = useFetchToken();

  useEffect(() => {
    if (!wednesdayLoading && !batchLoading && !sheetsLoading && !tokenLoading) {
      if (ghinNumber === '585871') setWednesdaySchedules(wednesdayValues);
      setSheetUrl(sheetsData);
      try {
        setSchedules(batchData.valueRanges[0].values);
        setTutorials(batchData.valueRanges[1].values);
        setBets(batchData.valueRanges[2].values);
        setCaptains(batchData.valueRanges[3].values);
        set('roster', batchData.valueRanges[4].values);
        if (dataMode === 'roster') {
          setFoundGolferAndIsLoggedIn(null);
          setCourseData(batchData.valueRanges[5].values);
        }
        const hasGoogleSheet = get('hasGoogleSheet');
        hasGoogleSheet && setPlayersAndGroups(batchData.valueRanges[6].values);
        set('token', token.golfer_user.golfer_user_token);
        setLoading(false);
      } catch (error) {
        navigate('/tablecreate');
      }
    }
  }, [wednesdayLoading, batchLoading, sheetsLoading, tokenLoading]);

  return [loading];
}
