import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,SQ} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';
export const correctionlogService = {
  fetchapi,
  createapi,
  updateapi,
  deleteapi,
  fileUpload,
  multiupdate_api,
  add_columnapi,
  fetchIndividualapi,
  filterapi,
  clear_api
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
  return fetch(  `${apiUrl}${SQ}correctionlog`, requestOptions)
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
return fetch(  `${apiUrl}${SQ}correctionlog/individual/`+id, requestOptions)
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
return fetch(  `${apiUrl}${SQ}correctionlog/create`, requestOptions)
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
  return fetch(`${apiUrl}${SQ}correctionlog/clear`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
} 
export function filterapi(page,per_page,request_no,quotation_no,area,inter_exter,quotation_doneby,auditor,error_type,comment,corrector,log_time,date) {

  
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({page,per_page,request_no,quotation_no,area,inter_exter,quotation_doneby,auditor,error_type,comment,corrector,log_time,date})
};
return fetch(  `${apiUrl}${SQ}correctionlog/pagination`, requestOptions)
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
  return fetch(`${apiUrl}${SQ}correctionlog/multiupdate`, requestOptions)
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
return fetch(  `${apiUrl}${SQ}correctionlog/addcolumn`, requestOptions)
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
return fetch(  `${apiUrl}${SQ}correctionlog/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
 
function deleteapi(id) {
  const user_id = localStorage.getItem('user_id') !== null ?  localStorage.getItem('user_id') :null
  const requestOptions = {
      method: 'Post',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ user_id })
  };
  return fetch(`${apiUrl}${SQ}correctionlog/delete/${id}`, requestOptions)
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
  var url = `${apiUrl}${SQ}correctionlog/bulkupload`
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
  