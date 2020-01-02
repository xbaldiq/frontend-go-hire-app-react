import Axios from 'axios';

const URL_STRING = 'http://localhost:8000/engineer/project/';

export const getProjectList = (id) => {
  return {
    type: 'ENG_GET_PROJECT_LIST',
    payload: Axios.get(URL_STRING, {
      params: {
        id
      },
      headers: {
        'Content-Type': 'application/json'
        //   Authorization: `Bearer `.concat(this.state.token)
      }
    })
  };
};
