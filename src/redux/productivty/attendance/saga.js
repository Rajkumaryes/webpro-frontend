import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Master_gateway} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';
export const attendanceService = {
  fetchapi,
  createapi,
  updateapi,
  deleteapi,
  fileUpload,
  fetchpaginationapi,
};
export function fileUpload(file,team)
{
  let data = new FormData();
  data.append('formFile', file);
  data.append('team', team);
  var url = `${apiUrl}${Master_gateway}attendance/bulkupload`
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
  export function fetchapi() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Master_gateway}attendance`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  

export function fetchpaginationapi(page,per_page,start_time,end_time,team,user_id) {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
        body: JSON.stringify({page,per_page,start_time,end_time,team,user_id})
  };
  return fetch(  `${apiUrl}${Master_gateway}attendance/pagination`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
 
export function createapi(user_id,category,description,start_time,end_time, menu,date,week,type,approval_status,status) {

 
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({ user_id,category,description,start_time,end_time, menu,date,week,type,approval_status,status})
};
return fetch(  `${apiUrl}${Master_gateway}attendance/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateapi(id,user_id,location,roaster_date,week_day,shift,login,logout,working_hour,extra_hour,attendance,leave_pending,leave_approved,team) {

  
  const requestOptions = {
    method: 'Post',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id,location,roaster_date,week_day,shift,login,logout,working_hour,extra_hour,attendance,leave_pending,leave_approved,team})
};
return fetch(  `${apiUrl}${Master_gateway}attendance/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
 
function deleteapi(id) {
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
  return fetch(`${apiUrl}${Master_gateway}attendance/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
  export default function* rootSaga() {
    yield all([
      fork(fetchapi),
      fork(createapi),
     fork(updateapi),
     fork(deleteapi),
    ]);
  }
  