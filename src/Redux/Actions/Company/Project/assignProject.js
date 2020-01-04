import Axios from 'axios';

const URL_STRING = 'http://localhost:8000/company/project/assign';

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