import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,apiUrlBooking,BookingProcess} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';

export const pendingfollowupService = {
  fetchpendingfollowup,
  creatependingfollowup,
  fileUpload,
  search,
  fetchpendingfollowupcount
};
export function fetchpendingfollowupcount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlBooking}${BookingProcess}pendingfollowup/pendingfollowupcount`, requestOptions)
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
  return fetch(  `${apiUrlBooking}${BookingProcess}pendingfollowup`, requestOptions)
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
export function creatependingfollowup(id,region,area,team,csb_office,user_id,booking_no,booking_type,exception_type,action_type,exception_raised_date,exception_resolved_date,
  start_time,end_time,updated_start_time,updated_end_time
) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ id,region,area,team,csb_office,user_id,booking_no,booking_type,exception_type,action_type,exception_raised_date,exception_resolved_date,
      start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlBooking}${BookingProcess}pendingfollowup/create`, requestOptions)
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
export function search( booking_no,exception_raised_date) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({booking_no,exception_raised_date})
};
return fetch(  `${apiUrlBooking}${BookingProcess}pendingfollowup/search`, requestOptions)
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
  var url = `${apiUrlBooking}${BookingProcess}pendingfollowup/bulkupload`
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
      fork(fetchpendingfollowupcount)
    ]);
  }
  