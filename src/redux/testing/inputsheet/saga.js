import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrlTesting,Export,Testing,currentUser} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const IndexingsheetService = {
  fetchIndexingsheet,
  createIndexingsheet,
  updateIndexingsheet,
  deleteIndexingsheet,
  fetchIndividualIndexingsheet,
  fetchapi
};
  export function fetchIndexingsheet() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlTesting}${Testing}inputsheet`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function fetchapi(apiname,page,per_page,startdate,enddate,user_array,is_report) {


  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({page,per_page,startdate,enddate,user_array,is_report})
};
return fetch(  `${apiUrlTesting}${Testing}${apiname}/report`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
export function fetchIndividualIndexingsheet(mtd_number) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
};
return fetch(  `${apiUrlTesting}${Testing}inputsheet/find/`+mtd_number, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function createIndexingsheet(user_id,time_taken,no_of_container,no_of_cargoitem,no_of_hbl,mtd_number,customer,
  issuer,shipper_coder, mr_code,main_pod,doc_cutoff, aggregated_status,type,date,time,medium,shipment_no,
  bl,etd, main_pol,main_voyage,tat_time,last_pod,auditsheet,aggregate_status,shipment_type,
  mtd_type,hbl,read,draft,sdc,free_time,credit,team,pod_end,consignee,frob_shipment, start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id,time_taken,no_of_container,no_of_cargoitem,no_of_hbl,mtd_number,customer,
      issuer,shipper_coder, mr_code,main_pod,doc_cutoff, aggregated_status,type,date,time,medium,shipment_no,
      bl,etd, main_pol,main_voyage,tat_time,last_pod,auditsheet,aggregate_status,shipment_type,
      mtd_type,hbl,read,draft,sdc,free_time,credit,team,pod_end,consignee,frob_shipment, start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlTesting}${Testing}testinginputsheet/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
export function updateIndexingsheet(id,user_id,time_taken,no_of_container,no_of_cargoitem,no_of_hbl,mtd_number,
  customer,isuuer,shipper_coder,mr_code,main_pod,doc_cutoff,aggregated_status,type,date,time,medium,numbers,bl,etd,main_pol,main_voyage,
  tat_time,last_pod,adult_sheet,aggregate_status,exception,shipment_type,mtd_type,hbl,read,draft,sdc,free_time,credit, start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,user_id,time_taken,no_of_container,no_of_cargoitem,no_of_hbl,mtd_number,
      customer,isuuer,shipper_coder,mr_code,main_pod,doc_cutoff,aggregated_status,type,date,time,medium,numbers,bl,etd,main_pol,main_voyage,
      tat_time,last_pod,adult_sheet,aggregate_status,exception,shipment_type,mtd_type,hbl,read,draft,sdc,free_time,credit, start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlTesting}${Testing}inputsheet/inputupdate/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}

function deleteIndexingsheet(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlTesting}${Testing}inputsheet/inputdelete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
  export default function* rootSaga() {
    yield all([
      fork(fetchIndexingsheet),
      fork(createIndexingsheet),
     fork(updateIndexingsheet),
     fork(deleteIndexingsheet),
     fork(fetchapi),
    ]);
  }
  