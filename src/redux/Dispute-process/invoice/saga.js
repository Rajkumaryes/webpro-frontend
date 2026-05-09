import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,DisputeProcess,apiUrlDispute} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
export const InvoiceService = {
  fetchapi,
  createapi,
  updateapi,
  deleteapi,
  fetchInvoiceCount
};
export function fetchInvoiceCount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlDispute}${DisputeProcess}invoice/invoicecount`, requestOptions)
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
  return fetch(  `${apiUrlDispute}${DisputeProcess}invoice`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function createapi( invoice,document,dispute,phase,status,collection_ref,invoice_number,invoice_no,date,
  ref_invoice,total_amount,additional_number,accounting_system,payer,collector,creater,
created_by,changed_by,payment_base,payment_terms,payment_due,date_of_activity,currency,
collection_kind,date_of_roe,language,layout_type,print_option,
  general_print,start_time,end_time,updated_start_time,updated_end_time,user_id) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ invoice,document,dispute,phase,status,collection_ref,invoice_number,invoice_no,date,
      ref_invoice,total_amount,additional_number,accounting_system,payer,collector,creater,
    created_by,changed_by,payment_base,payment_terms,payment_due,date_of_activity,currency,
    collection_kind,date_of_roe,language,layout_type,print_option,
      general_print,start_time,end_time,updated_start_time,updated_end_time,user_id})
};
return fetch(  `${apiUrlDispute}${DisputeProcess}invoice/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateapi(id, invoice,document,dispute,phase,status,collection_ref,invoice_number,invoice_no,date,
        ref_invoice,total_amount,additional_number,accounting_system,payer,collector,creater,
        created_by,changed_by,payment_base,payment_terms,payment_due,date_of_activity,currency,
        collection_kind,date_of_roe,language,layout_type,print_option,
        general_print) {
const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ invoice,document,dispute,phase,status,collection_ref,invoice_number,invoice_no,date,
      ref_invoice,total_amount,additional_number,accounting_system,payer,collector,creater,
    created_by,changed_by,payment_base,payment_terms,payment_due,date_of_activity,currency,
    collection_kind,date_of_roe,language,layout_type,print_option,
      general_print})
};
return fetch(  `${apiUrlDispute}${DisputeProcess}invoice/update/${id}`, requestOptions)
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
  return fetch(`${apiUrlDispute}${DisputeProcess}invoice/delete/${id}`, requestOptions)
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
     fork(fetchInvoiceCount)
    ]);
  }
  