import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,BookingProcess,apiUrlBookingAmendment,BookingAmendment} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';

export const workorderremovalService = {
  fetchbookingamendment,
  createbookingamendment,
  fileUpload,
  search,
  fetchworkorderremovalcount
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
  return fetch(  `${apiUrlBookingAmendment}${BookingAmendment}workorderremoval`, requestOptions)
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
  
export function fetchworkorderremovalcount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlBookingAmendment}${BookingAmendment}workorderremoval/workorderremovalcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
export function createbookingamendment(id, region,area,team,user_id,mot,reason,booking_number,sequence,
    start_time,end_time,updated_start_time,updated_end_time,received_date) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ id, region,area,team,user_id,mot,reason,booking_number,sequence,
        start_time,end_time,updated_start_time,updated_end_time,received_date})
};
return fetch(  `${apiUrlBookingAmendment}${BookingAmendment}workorderremoval/create`, requestOptions)
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
return fetch(  `${apiUrlBookingAmendment}${BookingAmendment}workorderremoval/search`, requestOptions)
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
  var url = `${apiUrlBookingAmendment}${BookingAmendment}workorderremoval/bulkupload`
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
      fork(fetchworkorderremovalcount)
    ]);
  }
  