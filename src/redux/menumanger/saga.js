import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Master_gateway} from '../../constants/defaultValues'
import {authHeader,logout} from '../../helpers/authheader';

export const menumanagerService = {
    fetchmenumanagerData,
    updatemenumanager,
    fetchsubmenumanagerData,
    updatesubmenumanager,
    fetchindividualmenumanagerData
  };

  export function fetchmenumanagerData() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Master_gateway}menumanager/fetch`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 
  
  }  
  export function fetchindividualmenumanagerData(menu_id) {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ menu_id})
  };
  return fetch(  `${apiUrl}${Master_gateway}menumanager/`+menu_id, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 
  
  } 
  export function updatemenumanager(item) {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify(item)
  };
  return fetch(  `${apiUrl}${Master_gateway}menumanager/multiupdate`, requestOptions)
  .then(response => response.json())
  .then(user => { 
   
      return user;
      }) 
      .catch((error) => {
        return error;
    }); 
  
  }
  export function fetchsubmenumanagerData(menu_id) {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ menu_id})
  };
  return fetch(  `${apiUrl}${Master_gateway}submenu/getsubmenu`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 
  
  } 
   
  export function updatesubmenumanager(item) {
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify(item)
  };
  return fetch(  `${apiUrl}${Master_gateway}submenu/multiupdate`, requestOptions)
  .then(response => response.json())
  .then(user => { 
   
      return user;
      }) 
      .catch((error) => {
        return error;
    }); 
  
  }

  export default function* rootSaga() {
    yield all([
      fork(fetchmenumanagerData),
      fork(updatemenumanager),
    ]);
  }