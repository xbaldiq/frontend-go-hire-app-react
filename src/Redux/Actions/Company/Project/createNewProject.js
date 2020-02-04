import Axios from 'axios';

const URL_STRING = process.env.REACT_APP_API_ENDPOINT + `/company/project/create`;

export const createNewProject = (projectName,token) => {
  return {
    type: 'POST_NEW_PROJECT',
    payload: Axios.post(URL_STRING, {name_project: projectName}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `.concat(token)
        }
      })
  };
};