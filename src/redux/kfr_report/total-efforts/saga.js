import { all, fork} from 'redux-saga/effects';
import {apiUrl,Master_gateway} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';

export const effortsdocService = {
  fetchpagination,
  fetchData,
  createapi,
  updateapi,
  deleteapi,
  fileUpload,
 
};
export function fetchData() {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
};
return fetch(  `${apiUrl}${Master_gateway}effortsdoc`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
  export function fetchpagination(page,per_page,region,area,team,month,year,
    location,is_report,username,date_time) {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
        body: JSON.stringify({page,per_page,region,area,team,month,year,
          location,is_report,username,date_time})
  };
  return fetch(  `${apiUrl}${Master_gateway}effortsdoc/filter`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function createapi(name,month,month_val,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({name,month,month_val,status})
};
return fetch(  `${apiUrl}${Master_gateway}effortsdoc/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateapi(id,month,year,region,area,location,team,mtd_volume_hb, actual_mtd_volume, bcm_shipment_shared, bcm_shipment_processed, post_bcm
  , total_edi, edi_console, manual_console, dg_edi, manual_dg_console, lcl
  , hbl_creation, indexing, exception, draft_correction, release_obl_swb, custom_transmission
  , mailbox_handling, query_resolved, si_replacements, vip, attach_sheet
  , working_days, tagging, total_efforts, region_total_efforts,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({month,year,region,area,location,team,mtd_volume_hb, actual_mtd_volume, bcm_shipment_shared, bcm_shipment_processed, post_bcm
      , total_edi, edi_console, manual_console, dg_edi, manual_dg_console, lcl
      , hbl_creation, indexing, exception, draft_correction, release_obl_swb, custom_transmission
      , mailbox_handling, query_resolved, si_replacements, vip, attach_sheet
      , working_days, tagging, total_efforts, region_total_efforts,status})
};
return fetch(  `${apiUrl}${Master_gateway}effortsdoc/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function deleteapi(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Master_gateway}effortsdoc/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function fileUpload(file)
{
  let user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) : 0 ;
  let data = new FormData();
  data.append('formFile', file);
  data.append('user_id', user_id);
  var url = `${apiUrl}${Master_gateway}effortsdoc/bulkupload`
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
      fork(fetchData),
      fork(createapi),
     fork(updateapi),
     fork(deleteapi),
  
    ]);
  }
  