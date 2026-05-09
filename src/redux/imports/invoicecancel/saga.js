import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Import} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';

export const InvoiceCancelService = {
  fetchinvoicecancel,
  createinvoicecancel,
  updateinvoicecancel,
  deleteinvoicecancel,
  fileUpload
 
};
  export function fetchinvoicecancel() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Import}invoicecancellation/fetch`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function createinvoicecancel( invoice_no,invoice_date,invoice_currency,invoice_amount,payer,shipment,invoice_creater,reasoncode,reason_remarks,
  orginal_invoice_no,area,userid,capturedid,invoice_type,gsc_comments,start_time,end_time,updated_start_time,updated_end_time) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ invoice_no,invoice_date,invoice_currency,invoice_amount,payer,shipment,invoice_creater,reasoncode,
      reason_remarks,orginal_invoice_no,area,userid,capturedid,invoice_type,gsc_comments,
      start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrl}${Import}invoicecancellation/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateinvoicecancel(id,invoice_no,invoice_date,invoice_currency,invoice_amount,payer,shipment,invoice_creater,reasoncode,reason_remarks,orginal_invoice_no,area,userid,capturedid,invoice_type,gsc_comments) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ invoice_no,invoice_date,invoice_currency,invoice_amount,payer,shipment,invoice_creater,reasoncode,reason_remarks,orginal_invoice_no,area,userid,capturedid,invoice_type,gsc_comments})
};
return fetch(  `${apiUrl}${Import}invoicecancellation/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function deleteinvoicecancel(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Import}invoicecancellation/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function fileUpload(file,capturedid)
{
  let data = new FormData();
  data.append('formFile', file);
  data.append('capturedid', capturedid);

  var url = `${apiUrl}${Import}invoicecancellation/bulkupload`
  return axios.post(url, data, {
    headers: {
    'content-type': 'multipart/form-data',
    ...authHeader()
    }
    })
    .then(res => {
     return res
      
    })
    .catch()
         
}
  export default function* rootSaga() {
    yield all([
      fork(fetchinvoicecancel),
      fork(createinvoicecancel),
     fork(updateinvoicecancel),
     fork(deleteinvoicecancel),
  
    ]);
  }
  