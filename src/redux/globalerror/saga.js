import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Master_gateway} from '../../constants/defaultValues';
import {authHeader} from '../../helpers/authheader';
import axios from 'axios';
export const globalerrorService = {
  fetchapi,
  createGlobalerror,
  fileUpload,
  errorDelete,
  fetcherror
 
};
  export function fetchapi() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrl}${Master_gateway}globalerror`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  

export function fetcherror(page,per_page,startdate,enddate,user_array,
  username,team_id) {


  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify({page,per_page,startdate,enddate,user_array,
        username,team_id})
};
return fetch(  `${apiUrl}${Master_gateway}globalerror/fetchError`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

} 
function errorDelete(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrl}${Master_gateway}globalerror/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function createGlobalerror(user_id,error_date,error_type,process,sub_process,error_code,category,error_captured_userid,error_reviewed_userid,transaction_no,exception_id,detailed_description,route_cause,no_of_lane
       ) {
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({user_id,error_date,error_type,process,sub_process,error_code,category,error_captured_userid,error_reviewed_userid,transaction_no,exception_id,detailed_description,route_cause,no_of_lane
      })
  };
  return fetch(  `${apiUrl}${Master_gateway}globalerror/create`, requestOptions)
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
  var url = `${apiUrl}${Master_gateway}globalerror/bulkupload`
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
      fork(fetchapi),
      fork(createGlobalerror),
      fork(errorDelete),
      fork(fetcherror)
    ]);
  }
  