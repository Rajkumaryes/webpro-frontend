import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Railnotification,apiUrlRailNotification} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const accuracyService = {
  fetchaccuracy,
  createaccuracy,

};
  export function fetchaccuracy() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlRailNotification}${Railnotification}accuracy`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function createaccuracy(user_id,team,error_type,error_nos,date_of_error,source,created_by,start_time,end_time,updated_end_time,updated_start_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id,team,error_type,error_nos,date_of_error,source,created_by,start_time,end_time,updated_end_time,updated_start_time})
};
return fetch(  `${apiUrlRailNotification}${Railnotification}accuracy/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}

 

  export default function* rootSaga() {
    yield all([
      fork(fetchaccuracy),
      fork(createaccuracy),
   
    ]);
  }
  