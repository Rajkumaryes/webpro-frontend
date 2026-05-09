import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,RA} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';
export const disputeService = {
  fetchapi,
  createapi,
  updateapi,
  deleteapi,
  fileUpload,
  multiupdate_api,
  add_columnapi,
  fetchIndividualapi,
  filterapi,
  clear_api,
  fetchIndividual_api
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
  return fetch(  `${apiUrl}${RA}dispute`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

} 
export function fetchIndividual_api(id) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
};
return fetch(  `${apiUrl}${RA}dispute/getbyid/`+id, requestOptions)
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
return fetch(  `${apiUrl}${RA}dispute/individual/`+id, requestOptions)
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
return fetch(  `${apiUrl}${RA}dispute/create`, requestOptions)
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
  return fetch(`${apiUrl}${RA}dispute/clear`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
} 
export function filterapi(page,per_page,publisher, dispute_no ,request_no,booking_no,publisher_status ,auditor,auditor_status,area,customer) {

  
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({page,per_page,publisher, dispute_no ,request_no,booking_no,publisher_status ,auditor,auditor_status,area,customer})
};
return fetch(  `${apiUrl}${RA}dispute/pagination`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
function multiupdate_api(update) {
 
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify(update)
  };
  return fetch(`${apiUrl}${RA}dispute/multiupdate`, requestOptions)
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
return fetch(  `${apiUrl}${RA}dispute/addcolumn`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
export function updateapi(id,request_no,booking_no,dispute_no,area,customer
  ,received_time,publisher,publisher_status,pub_in_progress,pub_pending_in,pub_pending_out,
  pub_done_time,pub_disregrads,pub_total,pub_routes,comments_publisher,auditor,
  auditor_status,aud_in_progress,aud_pending_in,aud_pending_out,
  aud_done_time,aud_disregrads,aud_total,aud_routes,comments_audit,user_id,start_time,end_time,updated_start_time,updated_end_time) {

  // const user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) :null
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({request_no,booking_no,dispute_no,area,customer
      ,received_time,publisher,publisher_status,pub_in_progress,pub_pending_in,pub_pending_out,
      pub_done_time,pub_disregrads,pub_total,pub_routes,comments_publisher,auditor,
      auditor_status,aud_in_progress,aud_pending_in,aud_pending_out,
      aud_done_time,aud_disregrads,aud_total,aud_routes,comments_audit,user_id,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrl}${RA}dispute/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
 
function deleteapi(id) {
  const user_id = localStorage.getItem('user_id') !== null ? (localStorage.getItem('user_id')).toString() :null
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ user_id })
  };
  return fetch(`${apiUrl}${RA}dispute/delete/${id}`, requestOptions)
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
  var url = `${apiUrl}${RA}dispute/bulkupload`
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
      fork(fetchapi),
      fork(createapi),
     fork(updateapi),
     fork(deleteapi),
    ]);
  }
  