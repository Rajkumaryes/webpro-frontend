import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,FA,apiUrlFA} from '../../../constants/defaultValues';
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';

export const ReportService = {
  downloadoverview,
  updatereport,
  deletereport,
  fileUpload,
  downloadfinding,
};
  export function fetchreport() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlFA}${FA}report`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function downloadoverview(  subregion,area,region, csbooking, op_pol, op_pod, cc_saler,
  contract_party,data,export_quality,import_quality,startdate,enddate,auditor,audit_type,office,user_id) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ subregion,area,region, csbooking, op_pol, op_pod, cc_saler,
      contract_party,data,export_quality,import_quality,startdate,enddate,auditor,audit_type,office,user_id})
};
return fetch(  `${apiUrlFA}${FA}shipmentdetails/frieghtaudit_overview`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
export function downloadfinding(  subregion,area,region, csbooking, op_pol, op_pod, cc_saler,
  contract_party,data,export_quality,import_quality,startdate,enddate,auditor,audit_type,office,user_id) {


  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ subregion,area,region, csbooking, op_pol, op_pod, cc_saler,
      contract_party,data,export_quality,import_quality,startdate,enddate,auditor,audit_type,office,user_id})
};
return fetch(  `${apiUrlFA}${FA}shipmentdetails/frieghtaudit_finding`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
export function updatereport(id,name,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({name,status})
};
return fetch(  `${apiUrlFA}${FA}report/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function deletereport(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlFA}${FA}report/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function fileUpload(file)
{
  let data = new FormData();
  data.append('formFile', file);
  var url = `${apiUrlFA}${FA}report/bulkupload`
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
      fork(fetchreport),
     fork(updatereport),
     fork(deletereport),
  
    ]);
  }
  