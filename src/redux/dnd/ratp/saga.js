import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,DnD,currentUser,apiUrlDD} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const ratpService = {
  fetchratp,
  createratp,
  fetchratpcount
};
export function fetchratpcount(user) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user})
};
return fetch(  `${apiUrlDD}${DnD}ratp/ratpcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchratp() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlDD}${DnD}ratp`, requestOptions)
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
export function createratp(user,region,date,week,month,mho,count,start_datetime,end_datetime,tat,filename,start_time,end_time,updated_end_time,updated_start_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user,region,date,week,month,mho,count,start_datetime,end_datetime,end_datetime,tat,filename,start_time,end_time,updated_end_time,updated_start_time})
};
return fetch(  `${apiUrlDD}${DnD}ratp/create`, requestOptions)
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
      fork(fetchratp),
      fork(createratp),
      fork(fetchratpcount)
    ]);
  }
  