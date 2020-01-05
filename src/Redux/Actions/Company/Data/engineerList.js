import Axios from 'axios';

const URL_STRING = 'http://localhost:8000/engineer';


export const getAllEngineer = (params, token) => {
  const filter = Object.keys(params)[4];
  return {
    type: 'GET_ENG_LIST',
    payload: Axios.get(URL_STRING, {
      params: {
        sort: params.sort,
        order: params.order,
        page: params.page,
        limit: params.limit,
        [filter]: params[filter]
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token)
      }
    })
  };
};
