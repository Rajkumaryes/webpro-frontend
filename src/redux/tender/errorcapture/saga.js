import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Tender,currentUser} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const ErrorCaptureService = {
  fetcherrorcapture,
  createerrorcapture,
  updateerrorcapture,
  deleteerrorcapture,
};
  export function fetcherrorcapture() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Tender}errorcapturing/fetch`, requestOptions)
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
export function createerrorcapture(user_id,error_reported_date,error_reported_week,tender_processed_date,tender_processed_week,
  error_userid,tendername,areacode,tender_round,tender_category,tender_type,error_type,total_lanes,
  activity,subactivity,section,error_status,error_lanecount,error_severity,lanecount_severity,
  error_capturedby,error_comments,gtm_hh_comments,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id,error_reported_date,error_reported_week,tender_processed_date,tender_processed_week,
      error_userid,tendername,areacode,tender_round,tender_category,tender_type,error_type,total_lanes,
      activity,subactivity,section,error_status,error_lanecount,error_severity,lanecount_severity,
      error_capturedby,error_comments,gtm_hh_comments,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrl}${Tender}errorcapturing/create`, requestOptions)
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
export function updateerrorcapture(id,user_id,error_reported_date,error_reported_week,tender_processed_date,tender_processed_week,
  error_userid,tendername,areacode,tender_round,tender_category,tender_type,error_type,total_lanes,
  activity,subactivity,section,error_status,error_lanecount,error_severity,lanecount_severity,
  error_capturedby,error_comments,gtm_hh_comments) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,user_id,error_reported_date,error_reported_week,tender_processed_date,tender_processed_week,
      error_userid,tendername,areacode,tender_round,tender_category,tender_type,error_type,total_lanes,
      activity,subactivity,section,error_status,error_lanecount,error_severity,lanecount_severity,
      error_capturedby,error_comments,gtm_hh_comments})
};
return fetch(  `${apiUrl}${Tender}errorcapturing/update/${id}`, requestOptions)
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

function deleteerrorcapture(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Tender}errorcapturing/delete/${id}`, requestOptions)
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
  export default function* rootSaga() {
    yield all([
      fork(fetcherrorcapture),
      fork(createerrorcapture),
     fork(updateerrorcapture),
     fork(deleteerrorcapture),
    ]);
  }
  