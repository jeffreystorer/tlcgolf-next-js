import React, { useEffect, useState } from 'react';
import buildCanadianRequests from '../utils/buildCanadianRequests';
import buildCourseRequests from '@/components/fetchdata/apis/utils/buildCourseRequests';
import buildGHINRequests from '@/components/fetchdata/apis/utils/buildGHINRequests';

export default function useFetchRequests(mode) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  let requests;
  switch (mode) {
    case 'canadian':
      requests = buildCanadianRequests();
      break;
    case 'course':
      requests = buildCourseRequests();
      break;
    case 'ghin':
      requests = buildGHINRequests();
      break;
    default:
      break;
  }

  useEffect(() => {
    Promise.all(requests)
      .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            switch (mode) {
              case 'canadian':
                return response.members[0];
              case 'course':
                return response.data;
              case 'ghin':
                return response.data.golfers[0];
              default:
                break;
            }
          })
        );
      })
      .then(function (data) {
        setData(data);
        setLoading(false);
      });
  }, []);

  return [data, loading];
}
