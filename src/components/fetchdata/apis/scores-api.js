import { BaseApi } from '@/components/fetchdata/apis';

class ScoresApi extends BaseApi {
  scores = (token, golfer_id) => {
    const url = `https://api.ghin.com/api/v1/scores/search.json?golfer_id=${golfer_id}&from_date_played=2020-01-01&statuses=Validated&number_of_holes=18&per_page=100&page=1&include_9_holes=false&include_hole_details=false`; /*
    // eslint-disable-next-line no-unused-vars
    const params = {}; */
    return this.httpGet(`${url}`, token);
  };
}
export default new ScoresApi();
