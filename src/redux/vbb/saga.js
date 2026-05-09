import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Master_gateway} from '../../constants/defaultValues'
import {authHeader} from '../../helpers/authheader';
import axios from 'axios';

export const VbbparameterService = {
  fetchVBB,
  fetchVBBs,
  updateparameter,
};
  export function fetchVBB() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Master_gateway}vbbparameter`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function fetchVBBs(user_level,vbb_cycle,team_id,user_id) {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
        body: JSON.stringify({ user_level,vbb_cycle,team_id,user_id})
  };
  return fetch(  `${apiUrl}${Master_gateway}vbbparameter/levelparameter`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}
export function createteams(region,area,name,country_code,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ region,area,name,country_code,status})
};
return fetch(  `${apiUrl}${Master_gateway}teams/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateparameter(id,vbb_name,vbb_anchor,l6A,l6B,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,vbb_name,vbb_anchor,l6A,l6B,status})
};
return fetch(  `${apiUrl}${Master_gateway}vbbparameter/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function fetchteam_regionwise(region,area) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({ region,area })
};
return fetch(  `${apiUrl}${Master_gateway}teams/regionarea_wise`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
function deleteteams(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Master_gateway}teams/delete/${id}`, requestOptions)
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
  var url = `${apiUrl}${Master_gateway}teams/bulkupload`
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
      fork(fetchVBB),
      fork(fetchVBBs),
      fork(updateparameter),
    ]);
  } 
  