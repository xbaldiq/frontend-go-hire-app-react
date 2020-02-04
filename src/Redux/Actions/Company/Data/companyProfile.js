import Axios from 'axios';

const URL_STRING = process.env.REACT_APP_API_ENDPOINT + `/company/profile`;
const URL_STRING_PATCH = process.env.REACT_APP_API_ENDPOINT + `/company/`;

export const getCompanyProfile = token => {
  return {
    type: 'GET_COM_PROFILE',
    payload: Axios.get(URL_STRING, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `.concat(token)
      }
    })
  };
};  
export const patchCompanyProfile = (data,token) => {
  console.log('data',data)
  
  return {
    type: 'PATCH_COM_PROFILE',
    payload: Axios.patch(
      URL_STRING_PATCH,
      {
        name: data.name,
        description: data.description,
        location: data.location,
        logo: data.logo 
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `.concat(token)
        }
      }
    )
  };
};
