import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,DG,apiUrlDG} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';

export const inputstatusService = {
  fetchinputstatus,
  createinputstatus,
  updateinputstatus,
  deleteinputstatus,
  fileUpload,
};
export function fetchinputstatus() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlDG}${DG}inputstatus`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function createinputstatus(name,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ name,status})
};
return fetch(  `${apiUrlDG}${DG}inputstatus/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateinputstatus(id,name,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({name,status})
};
return fetch(  `${apiUrlDG}${DG}inputstatus/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function deleteinputstatus(id) {
  const user_id = parseInt(localStorage.getItem('user_id'))
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id,user_id })
  };
  return fetch(`${apiUrlDG}${DG}inputstatus/delete/${id}`, requestOptions)
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
  var url = `${apiUrlDG}${DG}inputstatus/bulkupload`
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
      fork(fetchinputstatus),
      fork(createinputstatus),
     fork(updateinputstatus),
     fork(deleteinputstatus),
  
    ]);
  }
  