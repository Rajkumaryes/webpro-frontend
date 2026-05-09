import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,FeedersSchedules,apiUrlFeeder} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const ErrorCaptureService = {
  fetchapi,
  createapi,
  updateapi,
  deleteapi,
};
  export function fetchapi() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlFeeder}${FeedersSchedules}errorcapture`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function createapi(  date,activity_type,no_of_dps,user,comments,source,week,area,region,
  vessel_operator,error_type,start_time,end_time,updated_start_time,updated_end_time,user_id) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({   date,activity_type,no_of_dps,user,comments,source,week,area,region,
      vessel_operator,error_type,start_time,end_time,updated_start_time,updated_end_time,user_id})
};
return fetch(  `${apiUrlFeeder}${FeedersSchedules}errorcapture/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateapi(id,  date,activity_type,no_of_dps,user,comments,source,week,area,region,vessel_operator,error_type) {

  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({  date,activity_type,no_of_dps,user,comments,source,week,area,region,vessel_operator,error_type})
};
return fetch(  `${apiUrlFeeder}${FeedersSchedules}errorcapture/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
 
function deleteapi(id) {
  // const user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) :null
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({  })
  };
  return fetch(`${apiUrlFeeder}${FeedersSchedules}errorcapture/delete/${id}`, requestOptions)
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
    ]);
  }
  