import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Master_gateway} from '../../constants/defaultValues';
import {authHeader} from '../../helpers/authheader';
import axios from 'axios';
export const globalattendanceService = {
  fetchapi,
  createGlobalattendance,
  fileUpload,

 
};
export function fetchapi(week_no,team_id,tlname ) {
const requestOptions = {
 method: 'POST',
 headers: {
     'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
     'Content-Type': 'application/json',
     ...authHeader()
   },
 body: JSON.stringify({week_no,team_id,tlname})
};
return fetch(  `${apiUrl}${Master_gateway}globalattendance/getData`, requestOptions)
.then(response => response.json())
.then(user => { 
 return user;
 }) 
 .catch((error) => {
}); 

} 
export function createGlobalattendance(data) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({data
    })
};
return fetch(  `${apiUrl}${Master_gateway}globalattendance/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}

// export function createGlobalattendance(data) {
//     const globalattendanceDto = {
//         data: data.map(item => JSON.stringify(item)) // Convert each item to JSON string
//     };

//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json',
//             ...authHeader()
//         },
//         body: JSON.stringify(globalattendanceDto)
//     };

//     return fetch(`${apiUrl}${Master_gateway}globalattendance/create`, requestOptions)
//         .then(response => response.json())
//         .then(user => {
//             return user;
//         })
//         .catch((error) => {
//             // Handle error
//         });
// }


export function fileUpload(file)
{
  let data = new FormData();
  data.append('formFile', file);
  var url = `${apiUrl}${Master_gateway}globalattendance/bulkupload`
  return axios.post(url, data, {
    headers: {
    'content-type': 'multipart/form-data',
    ...authHeader()
    }
    })
    .then(res => {
     return res
      
    })
    .catch()
         
}
  export default function* rootSaga() {
    yield all([
      fork(fetchapi),
      fork(createGlobalattendance),
    ]);
  }
  