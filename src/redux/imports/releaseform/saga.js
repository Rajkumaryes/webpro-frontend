import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Import,apiUrlImport} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const releasecountsheetService = {
  fetchreleasecount,
  createreleasecount,
  fetchrelaesecounts
 
};
export function fetchrelaesecounts(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlImport}${Import }releasecount/releasecountcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchreleasecount() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlImport}${Import}releasecount/fetch`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function createreleasecount(username,date,week,region, type,mtdnumber, received_time ,
  charges ,unit, tat_time,start_time,end_time,updated_start_time,updated_end_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({username,date,week,region, type,mtdnumber, received_time ,
      charges ,unit, tat_time,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlImport}${Import}releasecount/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  

  export default function* rootSaga() {
    yield all([
      fork(fetchreleasecount),
      fork(createreleasecount),
      fork(fetchrelaesecounts)
  
    ]);
  }
  