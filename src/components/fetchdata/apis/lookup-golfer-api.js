import { BaseApi } from '@/components/fetchdata/apis';

class LookupGolferApi extends BaseApi {
  lookupGolfer = (token, last_name, first_name, state) => {
    const firstName = first_name ? `&first_name=${first_name}%25` : '';
    const aState = state ? `&state=${state}` : '';
    const url = `https://api.ghin.com/api/v1/golfers/search.json?per_page=100&page=1&last_name=${last_name}${firstName}${aState}&country=United%20States&sorting_criteria=id&order=ASC&status=Active&updated_since=1950-01-01`; /*
    // eslint-disable-next-line no-unused-vars
    const params = {}; */
    return this.httpGet(`${url}`, token);
  };
}
export default new LookupGolferApi();
