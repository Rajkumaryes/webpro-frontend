import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,DisputeProcess,apiUrlDispute} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const errorcaptureService = {
  fetchapi,
  createapi,
  updateapi,
  deleteapi,
  // fileUpload,
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
  return fetch(  `${apiUrlDispute}${DisputeProcess}errorcapture`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function createapi(error_type,dispute_no,shipment_number,original_invoice,reinvoice_no,reinvoice_date,cancellation,dispute_capture,
prepaid,process,country,error_marked,error_receiveduser,error_receiveddate,week_no,remarks,start_time,end_time,
updated_start_time,updated_end_time,user_id) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      
                
    body: JSON.stringify({ error_type,dispute_no,shipment_number,original_invoice,reinvoice_no,reinvoice_date,cancellation,dispute_capture,
        prepaid,process,country,error_marked,error_receiveduser,error_receiveddate,week_no,remarks,start_time,end_time,
        updated_start_time,updated_end_time,user_id})
};
return fetch(  `${apiUrlDispute}${DisputeProcess}errorcapture/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateapi(id,error_type,dispute_no,shipment_number,reinvoice_no,reinvoice_date,cancellation,dispute_capture,
prepaid,process,country,error_marked,error_receiveduser,error_receiveddate,week_no,remarks) {
const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({error_type,dispute_no,shipment_number,reinvoice_no,reinvoice_date,cancellation,dispute_capture,
      prepaid,process,country,error_marked,error_receiveduser,error_receiveddate,week_no,remarks})
};
return fetch(  `${apiUrlDispute}${DisputeProcess}errorcapture/update/${id}`, requestOptions)
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
  return fetch(`${apiUrlDispute}${DisputeProcess}errorcapture/delete/${id}`, requestOptions)
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
  