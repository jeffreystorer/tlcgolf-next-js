import apiConfig from '@/components/fetchdata/apis/ghin/config/api-config';
import { get } from '@/components/common/utils';
import { GolferApi } from '@/components/fetchdata/apis';

export default function buildGHINRequests() {
  const token = get('token');
  const allPlayersInTable = get('allPlayersInTable');
  let requests = [];
  allPlayersInTable.forEach(buildRequests);

  function buildRequests(item, index) {
    const ghinNumber = item[0];
    requests = [...requests, GolferApi.findGolfer(ghinNumber, token)];
  }
  return requests;
}
