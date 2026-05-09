import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Import,apiUrlImport} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const vesselpostingService = {
  fetchvesselposting,
  createvesselposting,
  fetchvesselpostingcount
};
export function fetchvesselpostingcount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlImport}${Import }vesselposting/vesselpostingcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchvesselposting() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlImport}${Import}vesselposting/fetch`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function createvesselposting(username,date,week,region, activity,volume,   
  unit, tat,start_time,end_time,updated_start_time,updated_end_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ username,date,week,region, activity,volume,   
      unit, tat,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlImport}${Import}vesselposting/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  

  export default function* rootSaga() {
    yield all([
      fork(fetchvesselposting),
      fork(createvesselposting),
    fork(fetchvesselpostingcount)
  
    ]);
  }
  