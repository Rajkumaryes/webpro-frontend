import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,DG,currentUser,apiUrlDG } from '../../constants/defaultValues'
import {authHeader,logout} from '../../helpers/authheader';
export const trackandtraceService = {
  fetchtrackandtrace,
  createtrackandtrace,
  fetchtrackcount
};
export function fetchtrackcount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlDG}${DG}dgtracktracess/dgtracktracesscount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchtrackandtrace() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlDG}${DG}dgtracktracess`, requestOptions)
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
export function createtrackandtrace(user_id,regions,activity,remainders_email,startdate_time,enddate_time,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id,regions,activity,remainders_email,startdate_time,enddate_time,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlDG}${DG}dgtracktracess/create`, requestOptions)
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
      fork(fetchtrackandtrace),
      fork(createtrackandtrace),
      fork(fetchtrackcount)
    ]);
  }
  