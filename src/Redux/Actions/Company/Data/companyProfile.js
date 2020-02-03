import Axios from 'axios';

const URL_STRING = 'http://3.80.150.111:8005/company/profile';
const URL_STRING_PATCH = 'http://3.80.150.111:8005/company/';

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
