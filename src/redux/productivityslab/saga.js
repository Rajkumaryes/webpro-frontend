import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Master_gateway} from '../../constants/defaultValues';
import {authHeader} from '../../helpers/authheader';
import axios from 'axios';
export const productivityslabService = {
  fileUpload,
  fileUploads,
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

export function fileUpload(file)
{
  let data = new FormData();
  data.append('formFile', file);
  var url = `${apiUrl}${Master_gateway}usercount/productivityslab/bulkupload`
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
export function fileUploads(file)
{
  let data = new FormData();
  data.append('formFile', file);
  var url = `${apiUrl}${Master_gateway}usercount/accuracyslab/bulkupload`
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
      fork(fileUploads),
    ]);
  }
  