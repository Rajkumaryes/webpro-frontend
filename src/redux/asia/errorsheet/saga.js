import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,ASIA,currentUser} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const ErrorSheetService = {
  fetcherrorsheet,
  createerrorsheet,
  updateerrorsheet,
  deleteerrorsheet,
};
  export function fetcherrorsheet() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${ASIA}errorsheet`, requestOptions)
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
export function createerrorsheet( week,month,year,date,region,report,error_reported,no_of_error,reported_by,error_des,error_doneby,error_email,start_time,end_time,updated_start_time,updated_end_time,user_id) {
  // const user_id = parseInt(localStorage.getItem('user_id'))
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({  week,month,year,date,region,report,error_reported,no_of_error,reported_by,error_des,error_doneby,error_email,start_time,end_time,updated_start_time,updated_end_time,user_id})
};
return fetch(  `${apiUrl}${ASIA}errorsheet/create`, requestOptions)
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
export function updateerrorsheet(id, week,month,year,date,region,report,error_reported,no_of_error,reported_by,error_des,error_doneby,error_email) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id, week,month,year,date,region,report,error_reported,no_of_error,reported_by,error_des,error_doneby,error_email})
};
return fetch(  `${apiUrl}${ASIA}errorsheet/update/${id}`, requestOptions)
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

function deleteerrorsheet(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${ASIA}errorsheet/delete/${id}`, requestOptions)
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
      fork(fetcherrorsheet),
      fork(createerrorsheet),
     fork(updateerrorsheet),
     fork(deleteerrorsheet),
    ]);
  }
  