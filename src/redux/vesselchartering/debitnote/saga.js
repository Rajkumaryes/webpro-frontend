import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,VesselChartering,currentUser} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const debitnoteService = {
  fetchdebitnote,
  createdebitnote,
  updatedebitnote,
  deletedebitnote,
};
  export function fetchdebitnote() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${VesselChartering}debitnote`, requestOptions)
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
export function createdebitnote(user_id,vessel_name,tat_time,
  activity_type,week_no,email_datetime, start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id,vessel_name,tat_time,
      activity_type,week_no,email_datetime, start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrl}${VesselChartering}debitnote/create`, requestOptions)
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
export function updatedebitnote(id, week,month,year,date,region,report,error_reported,no_of_error,reported_by,error_des,error_doneby,error_email) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id, week,month,year,date,region,report,error_reported,no_of_error,reported_by,error_des,error_doneby,error_email})
};
return fetch(  `${apiUrl}${VesselChartering}debitnote/update/${id}`, requestOptions)
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

function deletedebitnote(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${VesselChartering}debitnote/delete/${id}`, requestOptions)
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
      fork(fetchdebitnote),
      fork(createdebitnote),
     fork(updatedebitnote),
     fork(deletedebitnote),
    ]);
  }
  