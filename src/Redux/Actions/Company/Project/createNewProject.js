import Axios from 'axios';

const URL_STRING = 'http://localhost:8000/company/project/create';

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