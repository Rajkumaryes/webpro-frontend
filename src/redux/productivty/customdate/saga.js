import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Master_gateway} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';
export const customdateService = {
  approvedatefetchapi,
  approvedatecreateapi,
  approvedatedeleteapi,
  approvedateupdateapi,
  applydatefetchapi,
  applydatecreateapi,
  applydatedeleteapi,
  applydateupdateapi,
};

  export function approvedatefetchapi() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Master_gateway}nonproductivity/approvedategetall`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function approvedatecreateapi(approvedate,approvedays) {

  const user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) :null
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ approvedate,approvedays})
};
return fetch(  `${apiUrl}${Master_gateway}nonproductivity/approvedatecreate`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}

export function approvedateupdateapi(id,approvedate,approvedays) {

  
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({approvedate,approvedays})
};
return fetch(  `${apiUrl}${Master_gateway}nonproductivity/approvedateupdate/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function approvedatedeleteapi(id) {
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
  return fetch(`${apiUrl}${Master_gateway}nonproductivity/approvedatedelete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}

  export function applydatefetchapi() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Master_gateway}nonproductivity/applydategetall`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function applydatecreateapi(applydate,applydays) {

  const user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) :null
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ applydate,applydays})
};
return fetch(  `${apiUrl}${Master_gateway}nonproductivity/applydatecreate`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}

export function applydateupdateapi(id,applydate,applydays) {

  
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({applydate,applydays})
};
return fetch(  `${apiUrl}${Master_gateway}nonproductivity/applydateupdate/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function applydatedeleteapi(id) {
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
  return fetch(`${apiUrl}${Master_gateway}nonproductivity/applydatedelete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}

  export default function* rootSaga() {
    yield all([
      fork(approvedatefetchapi),
      fork(approvedatecreateapi),
      fork(approvedatedeleteapi),
      fork(approvedateupdateapi),
      fork(applydatefetchapi),
      fork(applydatecreateapi),
      fork(applydatedeleteapi),
      fork(applydateupdateapi)
    ]);
  }
  