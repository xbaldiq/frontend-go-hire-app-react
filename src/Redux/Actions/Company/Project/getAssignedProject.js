import Axios from 'axios';

const URL_STRING = process.env.REACT_APP_API_ENDPOINT + `/company/project/assign`;

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