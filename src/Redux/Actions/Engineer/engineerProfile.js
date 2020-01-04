import Axios from 'axios';

const URL_STRING = 'http://localhost:8000/engineer/';

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
