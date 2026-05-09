import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,FeedersSchedules,apiUrlFeeder} from '../../../../constants/defaultValues';
import {authHeader} from '../../../../helpers/authheader';
import axios from 'axios';

export const ErrortypeService = {
  fetcherrortype,
  createerrortype,
  updateerrortype,
  deleteerrortype,
  fileUpload
};
  export function fetcherrortype() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlFeeder}${FeedersSchedules}errortype`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function createerrortype(name,sensitivity,status) {
  const user_id = parseInt(localStorage.getItem('username'))

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ name,sensitivity,user_id,status})
};
return fetch(  `${apiUrlFeeder}${FeedersSchedules}errortype/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateerrortype(id,name,sensitivity,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({name,sensitivity,status})
};
return fetch(  `${apiUrlFeeder}${FeedersSchedules}errortype/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function deleteerrortype(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlFeeder}${FeedersSchedules}errortype/delete/${id}`, requestOptions)
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
  var url = `${apiUrlFeeder}${FeedersSchedules}errortype/bulkupload`
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
      fork(fetcherrortype),
      fork(createerrortype),
     fork(updateerrortype),
     fork(deleteerrortype),
  
    ]);
  }
  