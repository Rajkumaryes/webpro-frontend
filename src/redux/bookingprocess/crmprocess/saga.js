import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrlBooking,BookingProcess} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';

export const crmprocessService = {
  fetchcrmprocess,
  createcrmprocess,
  fileUpload,
  search,
  fetchcrmcount
};
export function fetchcrmcount(gsc_userid) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ gsc_userid})
};
return fetch(  `${apiUrlBooking}${BookingProcess}crmprocess/crmcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchcrmprocess() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlBooking}${BookingProcess}crmprocess`, requestOptions)
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
export function createcrmprocess(id, gsc_userid,booking_no,case_number,team,region,area
  ,comments,status_case,received_datetime,start_time,end_time,updated_start_time,updated_end_time,action_type) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ id,gsc_userid,booking_no,case_number,team,region,area
      ,comments,status_case,received_datetime,start_time,end_time,updated_start_time,updated_end_time,action_type})
};
return fetch(  `${apiUrlBooking}${BookingProcess}crmprocess/create`, requestOptions)
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
export function search( booking_no,case_number) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ booking_no,case_number})
};
return fetch(  `${apiUrlBooking}${BookingProcess}crmprocess/search`, requestOptions)
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
  var url = `${apiUrlBooking}${BookingProcess}crmprocess/bulkupload`
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
      fork(fetchcrmprocess),
      fork(createcrmprocess),
      fork(fetchcrmcount)
    ]);
  }
  