import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,apiUrlVesselBalancing,Vesselbalancing} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';

export const pendingfollowupService = {
  fetchpendingfollowup,
  creatependingfollowup,
  search,
  fetchpendingfollowupcount,
  fileUpload
 
};
export function fetchpendingfollowupcount(gsc_userid) {
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ gsc_userid})
  };
  return fetch(  `${apiUrlVesselBalancing}${Vesselbalancing}pendingfollowup/pendingfollowupcount`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    });
  }
  export function fetchpendingfollowup() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlVesselBalancing}${Vesselbalancing}pendingfollowup`, requestOptions)
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
export function creatependingfollowup( region, area, sub_area, case_email_subject, activity_level, pending_type, number_instance, status, start_time,
                end_time, updatedstarttime, updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ region, area, sub_area, case_email_subject, activity_level, pending_type, number_instance, status, start_time,
                end_time, updatedstarttime, updated_end_time})
};
return fetch(  `${apiUrlVesselBalancing}${Vesselbalancing}pendingfollowup/create`, requestOptions)
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
      fork(fetchpendingfollowup),
      fork(creatependingfollowup),
      fork(fetchpendingfollowupcount),
    ]);
  }
  