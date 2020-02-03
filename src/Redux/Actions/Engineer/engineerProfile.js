import Axios from 'axios';

const URL_STRING = 'http://3.80.150.111:8005/engineer/';

export const getEngineerProfile = (token) => {
  return {
    type: 'GET_ENG_PROFILE',
    payload: Axios.get(URL_STRING, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token)
      }
    })
  };
};
