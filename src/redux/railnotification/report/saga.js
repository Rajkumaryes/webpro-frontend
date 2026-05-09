import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Railnotification,apiUrlRailNotification} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const reportService = {
  fetchreport,
  createreport,

};
  export function fetchreport() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlRailNotification}${Railnotification}report`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function createreport(user_id,team,start_date,end_date,reports,type,created_by,start_time,end_time,updated_end_time,updated_start_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id,team,start_date,end_date,reports,type,created_by,start_time,end_time,updated_end_time,updated_start_time})
};
return fetch(  `${apiUrlRailNotification}${Railnotification}report/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}

 

  export default function* rootSaga() {
    yield all([
      fork(fetchreport),
      fork(createreport),
   
    ]);
  }
  