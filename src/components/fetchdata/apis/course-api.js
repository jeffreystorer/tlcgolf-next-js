import { BaseApi } from '@/components/fetchdata/apis';

class CourseApiClass extends BaseApi {
  getCourseData = (course_id, token) => {
    const url = `https://api.ghin.com/api/v1/courses/${course_id}/tee_set_ratings.json?number_of_holes=18&tee_set_status=Active`;
    // eslint-disable-next-line no-unused-vars
    const params = {};
    return this.httpGet(`${url}`, token);
  };
}
const CourseApi = new CourseApiClass();
export default CourseApi();
