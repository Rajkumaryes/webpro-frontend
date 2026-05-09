import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Railnotification,apiUrlRailNotification} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const freetimeService = {
  fetchfreetime,
  createfreetime,
  fetchfreetimeCount
};
export function fetchfreetimeCount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlRailNotification}${Railnotification}freetime/freetimecount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchfreetime() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlRailNotification}${Railnotification}freetime`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function createfreetime(container_number,user_id, last_update,completed_update,created_by,start_time,end_time,updated_end_time,updated_start_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ container_number,user_id, last_update,completed_update,created_by,start_time,end_time,updated_end_time,updated_start_time})
};
return fetch(  `${apiUrlRailNotification}${Railnotification}freetime/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}

 

  export default function* rootSaga() {
    yield all([
      fork(fetchfreetime),
      fork(createfreetime),
      fork(fetchfreetimeCount)
    ]);
  }
  