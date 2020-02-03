import Axios from 'axios';

const URL_STRING = 'http://3.80.150.111:8005/engineer/skill';
const URL_STRING_DELETE = 'http://3.80.150.111:8005/engineer/skill/1';

export const getEngineerSkill = token => {
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
export const postEngineerSkill = (skill_no, skill_item, token) => {
  return {
    type: 'POST_ENG_SKILL',
    payload: Axios.post(
      URL_STRING,
      {
        skill_no,
        skill_item
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `.concat(token)
        }
      }
    )
  };
};
export const deleteEngineerSkill = (skill_no, token) => {
  console.log('delete skill', skill_no);
  return {
    type: 'DELETE_ENG_SKILL',
    payload: Axios.delete(URL_STRING_DELETE, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token)
      },
      params: {
        skill_no: skill_no
      }
    })
  };
};
