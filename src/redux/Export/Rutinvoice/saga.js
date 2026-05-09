import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Export,currentUser,apiUrlExport} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const RutService = {
  fetchRut,
  createRut,
  updateRut,
  deleteRut,
  fetchIndividualRut,
  fileUpload,
  fetchrutinvoicecount
};
export function fetchrutinvoicecount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlExport}${Export}rutinvoice/rutinvoicecount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
  export function fetchRut() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlExport}${Export}rutinvoice`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function fetchIndividualRut(mtd_number) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
};
return fetch(  `${apiUrlExport}${Export}rutinvoice/find/`+mtd_number, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function createRut(user_id,time_taken,time,no_of_container,audit_sheet,no_of_cargoitem,mtd_number,customer,doc_cutoff,aggregated_status,type,date,
  medium,shipment_no,bl,etd,main_pol,main_voyage,main_pod,issuer,team,tat_time,last_pod,shipper_coder,mr_code,exception,shipment_type,mtd_type,hbl,read,draft,sdc,free_time,credit
  , consignee,rut_invoice_sdc, start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id,time_taken,time,no_of_container,audit_sheet,no_of_cargoitem,mtd_number,customer,doc_cutoff,aggregated_status,type,date,
      medium,shipment_no,bl,etd,main_pol,main_voyage,main_pod,issuer,team,tat_time,last_pod,shipper_coder,mr_code,exception,shipment_type,mtd_type,hbl,read,draft,sdc,free_time,credit
      , consignee, start_time,end_time,updated_start_time,updated_end_time,rut_invoice_sdc})
};
return fetch(  `${apiUrlExport}${Export}rutinvoice/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
export function updateRut(id,user_id,start_date,end_date, time,time_taken,no_of_container,no_of_cargoitem,mtd_number,customer,doc_cutoff,aggregated_status,type,date,
  medium,numbers,bl,etd,main_pol,main_voyage,main_pod,issuer,team,tat_time,last_pod,shipper_coder,mr_code,audit_sheet,exception,shipment_type,mtd_type,hbl,read,draft,sdc,free_time,credit) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,user_id,start_date,end_date, time,time_taken,no_of_container,no_of_cargoitem,mtd_number,customer,doc_cutoff,aggregated_status,type,date,
      medium,numbers,bl,etd,main_pol,main_voyage,main_pod,issuer,team,tat_time,last_pod,shipper_coder,mr_code,audit_sheet,exception,shipment_type,mtd_type,hbl,read,draft,sdc,free_time,credit})
};
return fetch(  `${apiUrlExport}${Export}inputsheet/inputupdate/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}

function deleteRut(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlExport}${Export}inputsheet/inputdelete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}

 function fileUpload(file,user_id)
{
  let data = new FormData();
  data.append('formFile', file);
  data.append('user_id', user_id);
  var url = `${apiUrlExport}${Export}rutinvoice/bulkupload`
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
      fork(fetchRut),
      fork(createRut),
     fork(updateRut),
     fork(deleteRut),
     fork(fileUpload),
     fork(fetchrutinvoicecount)
    ]);
  }
  