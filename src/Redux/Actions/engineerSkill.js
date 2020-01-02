import Axios from 'axios';

const URL_STRING = 'http://localhost:8000/engineer/skill';

export const getEngineerSkill = (token) => {
  return {
    type: 'GET_ENG_SKILL',
    payload: Axios.get(URL_STRING, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token)
      }
    })
  };
};
