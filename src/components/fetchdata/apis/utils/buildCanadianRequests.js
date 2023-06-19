//import { X_CORS_API_KEY } from '@/components/fetchdata/apis/constants';
import { get } from '@/components/common/utils';

export default function buildCanadianRequests() {
  const allPlayersInTable = get('allPlayersInTable');
  let requests = [];
  allPlayersInTable.forEach(buildRequests);

  function buildRequests(item, index) {
    const parenIndex = item[1].indexOf('(');
    //if we have a parenthetical, is it (M5.2) or (CM4725547)
    //where 4725547 is the card no. from http://gcapp.golfnet.com/community/golfers/search
    let parenType; //this will be either M, W, or C
    if (parenIndex > -1) {
      const paren = item[1].substr(parenIndex);
      parenType = paren.substr(1, 1);
      switch (parenType) {
        case 'C':
          const lastCPart = paren.substring(3);
          let cardNo = lastCPart.replace(')', '');
          requests = [
            ...requests,
            fetch(
              `https://nextjs-cors-anywhere.vercel.app/api?endpoint=https://scg.golfcanada.ca/api/members/search?text=${cardNo}`
            ).then((response) => response.json()),
            /* fetch(
              `https://proxy.cors.sh/https://scg.golfcanada.ca/api/members/search?text=${cardNo}`,
              {
                headers: {
                  'x-cors-api-key': X_CORS_API_KEY,
                },
              }
            ).then((response) => response.json()), */
          ];
          break;
        default:
          break;
      }
    }
  }
  return requests;
}
