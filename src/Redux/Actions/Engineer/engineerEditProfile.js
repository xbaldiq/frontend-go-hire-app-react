import Axios from 'axios';

const URL_STRING = 'http://localhost:8000/engineer/';

export const patchEngineerProfile = (data,token) => {
  return {
    type: 'PATCH_ENG_PROFILE',
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
