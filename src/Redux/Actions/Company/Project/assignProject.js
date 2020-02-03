import Axios from 'axios';

const URL_STRING = 'http://3.80.150.111:8005/company/project/assign';

export const assignProject = (data,token) => {
  return {
    type: 'POST_ASSIGN_PROJECT',
    payload: Axios.post(URL_STRING, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token)
      }
    })
  };
};