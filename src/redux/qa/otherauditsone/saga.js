import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,QA} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const otherauditsoneService = {
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
  return fetch(  `${apiUrl}${QA}otherauditsone`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function createapi(user_id, shipment_no,mtd_no,customer,medium,main_pod,main_pol,input_id,team,
  start_datetime,end_datetime,error,category,subcategory,auditor_id,
   auditor_remarks,tl_acceptance,tl_remarks,start_time,end_time,updated_start_time,updated_end_time) {

 
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id, shipment_no,mtd_no,customer,medium,main_pod,main_pol,input_id,team,
      start_datetime,end_datetime,error,category,subcategory,auditor_id,
       auditor_remarks,tl_acceptance,tl_remarks,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrl}${QA}otherauditsone/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateapi(id,name,status) {

  const user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) :null
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({name,status,user_id})
};
return fetch(  `${apiUrl}${QA}otherauditsone/update/${id}`, requestOptions)
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
  return fetch(`${apiUrl}${QA}otherauditsone/delete/${id}`, requestOptions)
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
  