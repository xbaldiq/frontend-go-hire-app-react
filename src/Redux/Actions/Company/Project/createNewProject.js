import Axios from 'axios';

const URL_STRING = 'http://3.80.150.111:8005/company/project/create';

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