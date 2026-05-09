import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Import,currentUser,apiUrlImport} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const CrmService = {
  createcrm,
  updatecrm,
  deletecrm,
  fileUpload,
  fetchcrmcount
};
  
export function fetchcrmcount(user_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id})
};
return fetch(  `${apiUrlImport}${Import}crm/crmcount`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  });
}
export function createcrm(user_id,region,team,shipment_no,activity,case_number,received_time,start_time,end_time,updated_start_time,updated_end_time) {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({user_id,region,team,shipment_no,activity,case_number,received_time,start_time,end_time,updated_start_time,updated_end_time})
  };
  return fetch(  `${apiUrlImport}${Import}crm/create`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 
  
  }
export function updatecrm(id,shipment_no,type,location,sender_id,user_id,date_time,end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,shipment_no,type,location,sender_id,user_id,date_time,end_time})
};
return fetch(  `${apiUrlImport}${Import}crm/indexupdate/${id}`, requestOptions)
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

function deletecrm(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlImport}${Import}crm/indexdelete/${id}`, requestOptions)
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
  var url = `${apiUrlImport}${Import}crm/bulkupload`
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
      fork(createcrm),
     fork(updatecrm),
     fork(deletecrm),
     fork(fileUpload),
     fork(fetchcrmcount)
    ]);
  }
  