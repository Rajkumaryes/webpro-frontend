import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,BookingProcess,apiUrlBookingAmendment,BookingAmendment} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';

export const omnicasehandlingService = {
  fetchbookingamendment,
  createbookingamendment,
  fileUpload,
  search,
  fetchbookingamendmentcount,
};

  export function fetchbookingamendment() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlBookingAmendment}${BookingAmendment}omnicasehandling`, requestOptions)
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
return fetch(  `${apiUrlBookingAmendment}${BookingAmendment}omnicasehandling/bookingamendmentcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
export function createbookingamendment(id, region,area,team,user_id,no_of_booking_number,booking_number,
    crm_case_no,amendment_caused_userid,amendment_type,status_of_the_case,exception_type,exception_reasons,amendment_dueto,comments,
    start_time,end_time,updated_start_time,updated_end_time,received_date) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ id, region,area,team,user_id,no_of_booking_number,booking_number,
        crm_case_no,amendment_caused_userid,amendment_type,status_of_the_case,exception_type,exception_reasons,amendment_dueto,comments,
        start_time,end_time,updated_start_time,updated_end_time,received_date})
};
return fetch(  `${apiUrlBookingAmendment}${BookingAmendment}omnicasehandling/create`, requestOptions)
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
return fetch(  `${apiUrlBookingAmendment}${BookingAmendment}omnicasehandling/search`, requestOptions)
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
  var url = `${apiUrlBookingAmendment}${BookingAmendment}omnicasehandling/bulkupload`
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
      fork(fetchbookingamendmentcount),
    ]);
  }
  