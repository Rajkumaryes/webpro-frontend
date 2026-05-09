import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Import,apiUrlImport} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const  docountService = {
  fetchdocount,
  createdocount,
  fetchdocounts
 
};
export function fetchdocounts(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlImport}${Import}do/docount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchdocount() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlImport}${Import}do/fetch`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function createdocount(username,date,week,region, type,mtdnumber, received_time ,
  remarks ,unit, tat_time,start_time,end_time,updated_start_time,updated_end_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ username,date,week,region, type,mtdnumber, received_time ,
      remarks ,unit, tat_time,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlImport}${Import}do/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}

  export default function* rootSaga() {
    yield all([
      fork(fetchdocount),
      fork(createdocount),
     fork(fetchdocounts)
  
    ]);
  }
  