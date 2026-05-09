import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,apiUrlVesselBalancing,Vesselbalancing} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';

export const vesselbalancingService = {
  fetchvb,
  createvb,
  search,
  fetchvbcount,
  fileUpload
 
};
export function fetchvbcount(gsc_userid) {
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ gsc_userid})
  };
  return fetch(  `${apiUrlVesselBalancing}${Vesselbalancing}vesselbalancing/vesselbalancingcount`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    });
  }
  export function fetchvb() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlVesselBalancing}${Vesselbalancing}vesselbalancing`, requestOptions)
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
export function createvb( id,gsc_userid,exception_raised_date,start_time,end_time,region,area,team,booking_number,csb_office,assigned_user,cu_matchcode ,mr_matchcode ,
  abc_nonabc ,export_haulage ,received_date ,functions,cargo_type,tariff_id,no_of_roll,booking_type,exception_party,case_number,
    reasons ,comments ,last_pod,end_pod,booking_status,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ id, gsc_userid,exception_raised_date,start_time,end_time,region,area,team,booking_number,csb_office,assigned_user,cu_matchcode ,mr_matchcode ,
      abc_nonabc ,export_haulage ,received_date ,functions,cargo_type,tariff_id,no_of_roll,booking_type,exception_party,case_number,
        reasons ,comments ,last_pod,end_pod,booking_status,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlVesselBalancing}${Vesselbalancing}vesselbalancing/create`, requestOptions)
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
      fork(fetchvb),
      fork(createvb),
      fork(fetchvbcount),
    ]);
  }
  