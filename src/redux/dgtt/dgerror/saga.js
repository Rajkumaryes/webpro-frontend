import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,DG,currentUser,apiUrlDG} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';

export const dgerrorService = {
  fetchdgerror,
  createdgerror,
  fileUpload
};
  export function fetchdgerror() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlDG}${DG}dgerrors`, requestOptions)
  .then(response => {
    if(!response.ok) 
    {
      if(response.status === 401)
      {
        logout()
      }
  
    }
    return response.json();
  })
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    });

}  
export function createdgerror(dg,track_trace,date,booking,total_cargo_email_booking_reminder,user,week_no,region,remark,start_time,end_time,updated_start_time,updated_end_time,user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({dg,track_trace,date,booking,total_cargo_email_booking_reminder,user,week_no,region,remark,start_time,end_time,updated_start_time,updated_end_time,user_id})
};
return fetch(  `${apiUrlDG}${DG}dgerrors/create`, requestOptions)
.then(response => {
  if(!response.ok) 
  {
    if(response.status === 401)
    {
      logout()
    }

  }
  return response.json();
})
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });

}
export function fileUpload(file)
{
  let data = new FormData();
  data.append('formFile', file);
  var url = `${apiUrlDG}${DG}dgerrors/bulkupload`
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
      fork(fetchdgerror),
      fork(createdgerror),
    ]);
  }
  