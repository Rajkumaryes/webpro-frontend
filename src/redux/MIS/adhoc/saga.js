import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,MIS,currentUser} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const ADHOCService = {
  fetchadhoc,
  createadhoc,
  updateadhoc,
  deleteadhoc,
  fetchIndividualadhoc
};
  export function fetchadhoc() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${MIS}adhoc`, requestOptions)
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
export function createadhoc( user_id,date,adhoc_request_from,details,email_subject,timetaken,
  severity,team,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id,date,adhoc_request_from,details,email_subject,timetaken,
      severity,team,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrl}${MIS}adhoc/create`, requestOptions)
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
export function updateadhoc(id, week,month,year,date,region,report,error_reported,no_of_error,reported_by,error_des,error_doneby,error_email) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id, week,month,year,date,region,report,error_reported,no_of_error,reported_by,error_des,error_doneby,error_email})
};
return fetch(  `${apiUrl}${MIS}adhoc/update/${id}`, requestOptions)
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

function deleteadhoc(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${MIS}adhoc/delete/${id}`, requestOptions)
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
export function fetchIndividualadhoc(user_id,date) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({ user_id,date })
};
return fetch(  `${apiUrl}${MIS}adhoc/find`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
  export default function* rootSaga() {
    yield all([
      fork(fetchadhoc),
      fork(createadhoc),
     fork(updateadhoc),
     fork(deleteadhoc),
    ]);
  }
  