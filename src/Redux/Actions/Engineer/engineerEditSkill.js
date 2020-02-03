import Axios from 'axios';

const URL_STRING = 'http://3.80.150.111:8005/engineer/';

export const patchEngineerProfile = (data,token) => {
  return {
    type: 'PATCH_ENG_SKILL',
    payload: Axios.patch(URL_STRING, {
        name: data.name,
        description: data.description,
        location: data.location
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token)
      }
    })
  };
};
