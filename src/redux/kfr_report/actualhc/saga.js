import { all, fork} from 'redux-saga/effects';
import {apiUrl,Master_gateway} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';

export const actualhcService = {
  fetchpagination,
  fetchData,
  createapi,
  updateapi,
  deleteapi,
  fileUpload,
 
};
export function fetchData() {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
};
return fetch(  `${apiUrl}${Master_gateway}actualhchc`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
  export function fetchpagination(page,per_page,region,area,team,process,month,year,
    location,is_report,username,date_time) {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
        body: JSON.stringify({page,per_page,region,area,team,process,month,year,
          location,is_report,username,date_time})
  };
  return fetch(  `${apiUrl}${Master_gateway}actualhc/filter`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function createapi(name,month,month_val,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({name,month,month_val,status})
};
return fetch(  `${apiUrl}${Master_gateway}actualhc/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateapi(id,process,month,year,region,area,location,team,c1,c2,c3,c4,c5,c6,c7,c8,
  non_automation_gain,automation_gain,d1,d2,d3,d4,total_loss,total_gain,finalnumber,
  actualhc,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({process,month,year,region,area,location,team,c1,c2,c3,c4,c5,c6,c7,c8,
      non_automation_gain,automation_gain,d1,d2,d3,d4,total_loss,total_gain,finalnumber,
      actualhc,status})
};
return fetch(  `${apiUrl}${Master_gateway}actualhc/update/${id}`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  

function deleteapi(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Master_gateway}actualhc/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function fileUpload(file)
{
  let user_id = localStorage.getItem('user_id') !== null ?  parseInt(localStorage.getItem('user_id')) : 0 ;
  let data = new FormData();
  data.append('formFile', file);
  data.append('user_id', user_id);
  var url = `${apiUrl}${Master_gateway}actualhc/bulkupload`
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
      fork(fetchData),
      fork(createapi),
     fork(updateapi),
     fork(deleteapi),
  
    ]);
  }
  