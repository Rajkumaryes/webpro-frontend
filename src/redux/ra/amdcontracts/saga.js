import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,RA,apiUrlRA} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';
export const amdcontractsService = {
  fetchapi,
  createapi,
  updateapi,
  deleteapi,
  fileUpload,
  multiupdate_api,
  filterapi,
  add_columnapi,
  fetchIndividualapi,
  fetchcontrolapi,
  filtercontrolapi,
  clear_api,
  delete_columnapi
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
  return fetch(  `${apiUrlRA}${RA}amdcontracts`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function fetchcontrolapi() {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
};
return fetch(  `${apiUrlRA}${RA}amdcontracts/controlscreen`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function fetchIndividualapi(id) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
};
return fetch(  `${apiUrlRA}${RA}amdcontracts/getbyid/`+id, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
function clear_api(ids) {
 
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ ids })
  };
  return fetch(`${apiUrlRA}${RA}amdcontracts/clear_tat`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
} 
export function createapi(name,status) {

  const user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) :null
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ name,status,user_id})
};
return fetch(  `${apiUrlRA}${RA}amdcontracts/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateapi(id,request_no,contract_no,type_of_req,amd_no,priority,size,area,region
  ,received_time,publisher,publisher_status,pub_in_progress,pub_pending_in,pub_pending_out,
  pub_done_time,pub_disregrads,pub_total,pub_routes,comments_publisher,auditor,
  auditor_status,aud_in_progress,aud_pending_in,aud_pending_out,error_log,
  aud_done_time,aud_disregrads,aud_total,aud_routes,comments_audit,user_id,
  start_time,end_time,updated_start_time,updated_end_time) {

  // const user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) :null
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({request_no,contract_no,type_of_req,amd_no,priority,size,area,region
      ,received_time,publisher,publisher_status,pub_in_progress,pub_pending_in,pub_pending_out,
      pub_done_time,pub_disregrads,pub_total,pub_routes,comments_publisher,auditor,
      auditor_status,aud_in_progress,aud_pending_in,aud_pending_out,error_log,
      aud_done_time,aud_disregrads,aud_total,aud_routes,comments_audit,user_id
      ,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlRA}${RA}amdcontracts/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function add_columnapi(columns) {

 
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({columns})
};
return fetch(  `${apiUrlRA}${RA}amdcontracts/addcolumn`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function delete_columnapi(columns) {

 
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({columns})
};
return fetch(  `${apiUrlRA}${RA}amdcontracts/deletecolumn`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function filterapi(page,per_page,start_date,end_date,request_no,publisher,publisher_status,auditor,
  auditor_status,size,priority,area,region,contract_no) {

  
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({page,per_page,start_date,end_date,request_no,publisher,publisher_status,auditor,
      auditor_status,size,priority,area,region,contract_no})
};
return fetch(  `${apiUrlRA}${RA}amdcontracts/pagination`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function filtercontrolapi(page,per_page,start_date,end_date,request_no,publisher,publisher_status,auditor,
  auditor_status,size,priority,area,region,contract_no) {

  
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({page,per_page,start_date,end_date,request_no,publisher,publisher_status,auditor,
      auditor_status,size,priority,area,region,contract_no})
};
return fetch(  `${apiUrlRA}${RA}amdcontracts/controlscreen_pagination`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
 
function deleteapi(id) {
  const user_id = localStorage.getItem('user_id') !== null ?  (localStorage.getItem('user_id')).toString() :null
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ user_id })
  };
  return fetch(`${apiUrlRA}${RA}amdcontracts/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function fileUpload(file,user_id)
{
  
  let data = new FormData();
  data.append('formFile', file);
  data.append('user_id', user_id);
  var url = `${apiUrlRA}${RA}amdcontracts/bulkupload`
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
function multiupdate_api(update) {
 
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({update})
  };
  return fetch(`${apiUrlRA}${RA}amdcontracts/multiupdate`, requestOptions)
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
  