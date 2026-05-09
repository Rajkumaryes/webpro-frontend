import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,DnD,apiUrlDD} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const errorsheetService = {
  fetcherrorsheet,
  createerrorsheet,
 
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
  return fetch(  `${apiUrlDD}${DnD}errorsheet`, requestOptions)
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
export function createerrorsheet(  region,date,week,month,number_error,error_done,error_des,reported_by,process_type,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ region,date,week,month,number_error,error_done,error_des,reported_by,process_type,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlDD}${DnD}errorsheet/create`, requestOptions)
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
    
    ]);
  }
  