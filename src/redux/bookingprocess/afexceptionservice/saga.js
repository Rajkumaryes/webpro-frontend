import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrlBooking,BookingProcess} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';

export const AfExceptionServiceService = {
  fetchAfExceptionService,
  createAfExceptionService,
  fileUpload,
  search,
  fetchafexceptioncount
};
export function fetchafexceptioncount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlBooking}${BookingProcess}af_exception/afexceptioncount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchAfExceptionService() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlBooking}${BookingProcess}af_exception`, requestOptions)
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

export function createAfExceptionService(id, region,area,team,user_id,shipment,dp_number,mr_party,category,result_code,issuer_userid,group,issue_date,exception_type,status_of_exception,comments,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id, region,area,team,user_id,shipment,dp_number,mr_party,category,result_code,issuer_userid,group,issue_date,exception_type,status_of_exception,comments,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlBooking}${BookingProcess}af_exception/create`, requestOptions)
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
export function search( shipment) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({  shipment})
};
return fetch(  `${apiUrlBooking}${BookingProcess}af_exception/search`, requestOptions)
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
  var url = `${apiUrlBooking}${BookingProcess}af_exception/bulkupload`
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
      fork(fetchAfExceptionService),
      fork(createAfExceptionService),
      fork(fetchafexceptioncount)
    ]);
  }
  