import Axios from 'axios';

const URL_STRING = `http://localhost:8000/engineer/project/`;

export const responseProject = data => {
    return {
      type: 'ENG_RESPONSE_PROJECT',
      payload: Axios.patch(URL_STRING, null, {
        params: {
          id: data.id,
          name_project :  data.name_project,
          status_project: data.status_project
        },
        headers: {
          'Content-Type': 'application/json'
          // Authorization: `Bearer `.concat(token)
        }
      }).then(res => {
        alert('success responding');
      })
    };
  };

// patchStatusProject = (name_project, status_project) => {
//     const url = `http://localhost:8000/engineer/project/`;
//     axios
//       .patch(url, null, {
//         params: {
//           id: this.state.UserId,
//           name_project,
//           status_project
//         },
//         headers: {
//           'Content-Type': 'application/json'
//           //   Authorization: `Bearer `.concat(this.state.token)
//         }
//       })
//       .then(engReceivedProject => {})
//       .catch(err => alert('error', err));
//   };