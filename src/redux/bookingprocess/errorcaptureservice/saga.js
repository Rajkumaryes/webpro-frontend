import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,BookingProcess} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';

export const errorcapturingService = {
  fetcherrorcapturing,
  createerrorcapturing,
  fileUpload,
  search
};
  export function fetcherrorcapturing() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${BookingProcess}errorcapturing`, requestOptions)
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
        
        export function createerrorcapturing(id,  region,area,team,user_id,date,booking_no,customer_mc,mr_match_code,error_type,error_description,error_userid,error_status,csb_office,action_plan,sensitivity,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id, region,area,team,user_id,date,booking_no,customer_mc,mr_match_code,error_type,error_description,error_userid,error_status,csb_office,action_plan,sensitivity,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrl}${BookingProcess}errorcapturing/create`, requestOptions)
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
export function search( booking_no,error_type) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ booking_no,error_type})
};
return fetch(  `${apiUrl}${BookingProcess}errorcapturing/search`, requestOptions)
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
  var url = `${apiUrl}${BookingProcess}errorcapturing/bulkupload`
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
      fork(fetcherrorcapturing),
      fork(createerrorcapturing),
    
    ]);
  }
  