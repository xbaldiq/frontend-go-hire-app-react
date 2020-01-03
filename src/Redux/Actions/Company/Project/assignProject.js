import Axios from 'axios';

const URL_STRING = 'http://localhost:8000/company/project/assign';

export const assignProject = data => {
  return {
    type: 'POST_ASSIGN_PROJECT',
    payload: Axios.post(URL_STRING, data, {
      headers: {
        'Content-Type': 'application/json'
        // Authorization: `Bearer `.concat(token)
      }
    }).then(res => {
      alert('success assign');
    })
  };
};

// Assign Project
// assignProject = () => {
//   const url = `http://localhost:8000/company/project/assign`;
//   const data = {
//     id_engineer: this.state.clickedId,
//     id_company: this.state.UserId,
//     name_project: this.state.projectSelected
//   };
//   axios
//     .post(url, data, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(res => {
//       alert('success assign');
//     })
//     .catch(err => alert('error', err));
// };
