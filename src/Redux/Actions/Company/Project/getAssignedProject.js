import Axios from 'axios';

const URL_STRING = 'http://localhost:8000/company/project/assign';

export const getAssignedProject = (token) => {
  // console.log('')
  return {
    type: 'COM_GET_ASSIGNED_PROJECT_LIST',
    payload: Axios.get(URL_STRING, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token)
      }
    })
  };
};