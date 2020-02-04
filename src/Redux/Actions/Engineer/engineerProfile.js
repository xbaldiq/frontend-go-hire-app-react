import Axios from 'axios';

const URL_STRING = process.env.REACT_APP_API_ENDPOINT + `/engineer/`;

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
