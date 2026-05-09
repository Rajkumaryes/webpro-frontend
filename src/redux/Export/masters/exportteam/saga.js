import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrlExport,Export} from '../../../../constants/defaultValues'
import {authHeader} from '../../../../helpers/authheader';
import axios from 'axios';

export const teamService = {
  fetchteams,
  createteams,
  updateteams,
  deleteteams,
 regionwisefilter,
 fileUpload,
 fetchemailtypes
};
let user_id = parseInt(localStorage.getItem('user_id'));
export function fetchteams() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlExport}${Export}exportteam`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}
export function fetchemailtypes() {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
};
return fetch(  `${apiUrlExport}${Export}emailtype`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
export function createteams(team_name,region_id,area_id,country_code,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ team_name,region_id,area_id,country_code,status,user_id})
};
return fetch(  `${apiUrlExport}${Export}exportteam/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateteams(id,team_name,region_id,area_id,country_code,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({team_name,region_id,area_id,country_code,status,user_id})
};
return fetch(  `${apiUrlExport}${Export}exportteam/update/${id}`, requestOptions)
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
  return fetch(`${apiUrlExport}${Export}exportteam/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function regionwisefilter(region_id) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ region_id})
};
return fetch(  `${apiUrlExport}${Export}exportteam/regionwise`, requestOptions)
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
  var url = `${apiUrlExport}${Export}exportteam/bulkupload`
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
      fork(fetchteams),
      fork(createteams),
     fork(updateteams),
     fork(deleteteams),
      fork(fetchemailtypes)
    ]);
  }
  