import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Export,apiUrlExport} from '../../../../constants/defaultValues'
import {authHeader} from '../../../../helpers/authheader';
import axios from 'axios';

export const matchcountryService = {
  fetchmatchcountry,
  creatematchcountry,
  updatematchcountry,
  deletematchcountry,
  fileUpload,

 
};
  export function fetchmatchcountry() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlExport}${Export}matchcountry`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function creatematchcountry(region_id,name,telephone,fax,taxcode,email_address,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ region_id,name,telephone,fax,taxcode,email_address,status})
};
return fetch(  `${apiUrlExport}${Export}matchcountry/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updatematchcountry(id,region_id,name,telephone,fax,taxcode,email_address,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({region_id,name,telephone,fax,taxcode,email_address,status})
};
return fetch(  `${apiUrlExport}${Export}matchcountry/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function deletematchcountry(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlExport}${Export}matchcountry/delete/${id}`, requestOptions)
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
  var url = `${apiUrlExport}${Export}matchcountry/bulkupload`
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
      fork(fetchmatchcountry),
      fork(creatematchcountry),
     fork(updatematchcountry),
     fork(deletematchcountry),
  
    ]);
  }
  