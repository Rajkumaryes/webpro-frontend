import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Import,apiUrlImport} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';

export const checklistactivityService = {
  fetchchecklistactivity,
  createchecklistactivity,
  updatechecklistactivity,
  deletechecklistactivity,
  fetchchecklistid_activity,
  fetchchecklistid_area,
  fileUpload,

};
export function fetchchecklistactivity() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlImport}${Import}checklistactivity`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function fetchchecklistid_area(area) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({ area})
};
return fetch(  `${apiUrlImport}${Import}checklistactivity/areawise`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
export function fetchchecklistid_activity(checklist_id) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({ checklist_id})
};
return fetch(  `${apiUrlImport}${Import}checklistactivity/checklistwise`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
export function createchecklistactivity(checklist_id,activity,eta,eq,kpi,area,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ checklist_id,activity,eta,eq,kpi,area,status})
};
return fetch(  `${apiUrlImport}${Import}checklistactivity/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updatechecklistactivity(id,checklist_id,activity,eta,eq,kpi,area,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({checklist_id,activity,eta,eq,kpi,area,status})
};
return fetch(  `${apiUrlImport}${Import}checklistactivity/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function deletechecklistactivity(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlImport}${Import}checklistactivity/delete/${id}`, requestOptions)
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
  var url = `${apiUrlImport}${Import}checklistactivity/bulkupload`
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
      fork(fetchchecklistactivity),
      fork(createchecklistactivity),
     fork(updatechecklistactivity),
     fork(deletechecklistactivity),
  
    ]);
  }
  