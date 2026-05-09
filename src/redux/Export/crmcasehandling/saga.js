import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Export,currentUser,apiUrlExport} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const CrmcasehandlingService = {
  createcrmcasehandling,
  updatecrmcasehandling,
  deletecrmcasehandling,
  fileUpload,
  fetchcrmcasehandling
};
  
export function fetchcrmcasehandling(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlExport}${Export}crmcasehandling/crmcasehandlingcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
export function createcrmcasehandling(user_id,region,area,team,shipment_no,activity,case_number,received_time,start_time,end_time,updated_start_time,updated_end_time) {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({user_id,region,area,team,shipment_no,activity,case_number,received_time,start_time,end_time,updated_start_time,updated_end_time})
  };
  return fetch(  `${apiUrlExport}${Export}crmcasehandling/create`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 
  
  }
export function updatecrmcasehandling(id,shipment_no,type,location,sender_id,user_id,date_time,end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,shipment_no,type,location,sender_id,user_id,date_time,end_time})
};
return fetch(  `${apiUrlExport}${Export}crmcasehandling/indexupdate/${id}`, requestOptions)
.then(response => {
  if(!response.ok) 
  {
    if(response.status === 401)
    {
      logout()
    }

  }
  return response.json();
})
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}

function deletecrmcasehandling(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlExport}${Export}crmcasehandling/indexdelete/${id}`, requestOptions)
  .then(response => {
    if(!response.ok) 
    {
      if(response.status === 401)
      {
        logout()
      }
  
    }
    return response.json();
  })
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    });          
}

function fileUpload(file,user_id)
{
  let data = new FormData();
  data.append('formFile', file);
  data.append('user_id', user_id);
  var url = `${apiUrlExport}${Export}crmcasehandling/bulkupload`
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
      fork(createcrmcasehandling),
     fork(updatecrmcasehandling),
     fork(deletecrmcasehandling),
     fork(fileUpload),
     fork(fetchcrmcasehandling)
    ]);
  }
  