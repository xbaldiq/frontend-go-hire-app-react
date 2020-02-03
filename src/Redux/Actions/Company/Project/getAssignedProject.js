import Axios from 'axios';

const URL_STRING = 'http://3.80.150.111:8005/company/project/assign';

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