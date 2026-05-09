import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,QA} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const mafauditService = {
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
  return fetch(  `${apiUrl}${QA}mafaudit`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function createapi(user_id,shipment_no,mtd_no,customer,corrector_id,charge_applicable,maf_applicable,
  start_datetime,end_datetime,chargecode,error,sob_date,auditor_id,standardcomment,
   auditor_remarks,tl_acceptance,tl_remarks,subcategory_comment,first_received_date,second_received_date,third_received_date,fourth_received_date,
   fifth_received_date,sixth_received_date,seventh_received_date,maf_xnx,maf_procedure,start_time,end_time,updated_start_time,updated_end_time) {

 
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id,shipment_no,mtd_no,customer,corrector_id,charge_applicable,maf_applicable,
      start_datetime,end_datetime,chargecode,error,sob_date,auditor_id,standardcomment,
       auditor_remarks,tl_acceptance,tl_remarks,subcategory_comment,first_received_date,second_received_date,third_received_date,fourth_received_date,
       fifth_received_date,sixth_received_date,seventh_received_date,maf_xnx,maf_procedure,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrl}${QA}mafaudit/create`, requestOptions)
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
return fetch(  `${apiUrl}${QA}mafaudit/update/${id}`, requestOptions)
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
  return fetch(`${apiUrl}${QA}mafaudit/delete/${id}`, requestOptions)
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
  