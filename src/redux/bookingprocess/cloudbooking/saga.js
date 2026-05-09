import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,apiUrlBooking,BookingProcess} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';

export const cloudbookingService = {
fetchcloudbooking,
  createcloudbooking,
  search,
  fetchcloudbookingcount,
  fileUpload
 
};
  export function fetchcloudbooking() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlBooking}${BookingProcess}cloudbooking`, requestOptions)
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
export function createcloudbooking( id,user_id,exception_raised_date,start_time,end_time,region,area,team,booking_number,csb_office,assigned_user,cu_matchcode ,mr_matchcode ,
  export_haulage ,received_date ,cargo_type,tariff_id,exception_party,exception_resolved,case_number,
    reasons ,comments ,last_pod,end_pod,booking_status,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ id, user_id,exception_raised_date,start_time,end_time,region,area,team,booking_number,csb_office,assigned_user,cu_matchcode ,mr_matchcode ,
      export_haulage ,received_date ,cargo_type,tariff_id,exception_party,exception_resolved,case_number,
        reasons ,comments ,last_pod,end_pod,booking_status,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlBooking}${BookingProcess}cloudbooking/create`, requestOptions)
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
return fetch(  `${apiUrlBooking}${BookingProcess}cloudbooking/search`, requestOptions)
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
export function fetchcloudbookingcount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlBooking}${BookingProcess}cloudbooking/cloudbookingcount`, requestOptions)
.then(response => response.json())
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
  var url = `${apiUrl}${BookingProcess}cloudbooking/bulkupload`
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
      fork(fetchcloudbooking),
      fork(createcloudbooking),
      fork(fetchcloudbookingcount),
    ]);
  }
  