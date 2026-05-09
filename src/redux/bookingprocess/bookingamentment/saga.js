import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrlBooking,BookingProcess} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';

export const bookingamendmentService = {
  fetchbookingamendment,
  createbookingamendment,
  fileUpload,
  search,
  fetchbookingamendmentcount
};
export function fetchbookingamendmentcount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlBooking}${BookingProcess}bookingamendment/bookingamendmentcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchbookingamendment() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlBooking}${BookingProcess}bookingamendment`, requestOptions)
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
export function createbookingamendment(id, region,area,team,user_id,issuer_office,csb_office,booking_no,cu_match_code,mr_match_code,amendment_medium,
  crm_case_no,amendment_type_array,amendment_induced_by,amendment_status,reason,assigned_to,cargo_type,comments,exception_start_date,no_of_shipment,
  last_pod,end_pod,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ id,region,area,team,user_id,issuer_office,csb_office,booking_no,cu_match_code,mr_match_code,amendment_medium,
      crm_case_no,amendment_type_array,amendment_induced_by,amendment_status,reason,assigned_to,cargo_type,comments,exception_start_date,no_of_shipment,
      last_pod,end_pod,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlBooking}${BookingProcess}bookingamendment/create`, requestOptions)
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
export function search( booking_no,exception_start_date) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ booking_no,exception_start_date})
};
return fetch(  `${apiUrlBooking}${BookingProcess}bookingamendment/search`, requestOptions)
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
  var url = `${apiUrlBooking}${BookingProcess}bookingamendment/bulkupload`
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
      fork(fetchbookingamendment),
      fork(createbookingamendment),
      fork(fetchbookingamendmentcount)
    ]);
  }
  