import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrlMainline,Mainline} from '../../../constants/defaultValues'
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
  return fetch(  `${apiUrlMainline}${Mainline}errorcapture`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function createapi(  date,error_classification,error_occurred,dp_voyage,no_of_dps,user_id,comments,week,region,sensitivity,
  error_type,start_time,end_time,updated_start_time,updated_end_time,error_upload_user) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({   date,error_classification,error_occurred,dp_voyage,no_of_dps,user_id,comments,week,region,sensitivity,
      error_type,start_time,end_time,updated_start_time,updated_end_time,error_upload_user})
};
return fetch(  `${apiUrlMainline}${Mainline}errorcapture/create`, requestOptions)
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
return fetch(  `${apiUrlMainline}${Mainline}errorcapture/update/${id}`, requestOptions)
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
  return fetch(`${apiUrlMainline}${Mainline}errorcapture/delete/${id}`, requestOptions)
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
  