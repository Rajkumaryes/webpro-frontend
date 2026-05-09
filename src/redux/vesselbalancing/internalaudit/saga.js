import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,apiUrlVesselBalancing,Vesselbalancing} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';

export const internalauditService = {
  fetchinternalaudit,
  createinternalaudit,
  search,
  fetchinternalauditcount,
  fileUpload
 
};
export function fetchinternalauditcount(user_id) {
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ user_id})
  };
  return fetch(  `${apiUrlVesselBalancing}${Vesselbalancing}internalaudit/internalauditcount`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    });
  }
  export function fetchinternalaudit() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlVesselBalancing}${Vesselbalancing}internalaudit`, requestOptions)
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
export function createinternalaudit( region, area, sub_area, case_email_booking, audit_type,error_status, comments, start_time,
                end_time, updatedstarttime, updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ region, area, sub_area, case_email_booking, audit_type,error_status, comments, start_time,
                end_time, updatedstarttime, updated_end_time})
};
return fetch(  `${apiUrlVesselBalancing}${Vesselbalancing}internalaudit/create`, requestOptions)
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
export function search( booking_number,functions) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ booking_number,functions})
};
return fetch(  `${apiUrlVesselBalancing}${Vesselbalancing}vesselbalancing/search`, requestOptions)
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
  var url = `${apiUrlVesselBalancing}${Vesselbalancing}vesselbalancing/bulkupload`
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
      fork(fetchinternalaudit),
      fork(createinternalaudit),
      fork(fetchinternalauditcount),
    ]);
  }
  