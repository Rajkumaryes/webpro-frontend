import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,DisputeProcess,apiUrlDispute} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const communicationService = {
  fetchapi,
  createapi,
  updateapi,
  deleteapi,
  fetchcommunicationCount
};
export function fetchcommunicationCount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlDispute}${DisputeProcess}communication/communicationcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchapi() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlDispute}${DisputeProcess}communication`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function createapi(user_id,start_time,end_time,from,subject,mail_received,process,
  country,mail_action,remarks,start_times,end_times,updated_start_time,updated_end_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id,start_time,end_time,from,subject,mail_received,process,
      country,mail_action,remarks,start_times,end_times,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlDispute}${DisputeProcess}communication/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateapi(id,user_id,start_time,end_time,from,subject,mail_received,process,
  country,mail_action,remarks,start_times,end_times,updated_start_time,updated_end_time) {

  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id,start_time,end_time,from,subject,mail_received,process,
      country,mail_action,remarks,start_times,end_times,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlDispute}${DisputeProcess}communication/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
 
function deleteapi(id) {
  const user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) :null
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ user_id })
  };
  return fetch(`${apiUrlDispute}${DisputeProcess}communication/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
  export default function* rootSaga() {
    yield all([
      fork(fetchapi),
      fork(createapi),
     fork(updateapi),
     fork(deleteapi),
     fork(fetchcommunicationCount)
    ]);
  }
  