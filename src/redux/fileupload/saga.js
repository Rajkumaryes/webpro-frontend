import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Master_gateway} from '../../constants/defaultValues'
import {authHeader} from '../../helpers/authheader';
import axios from 'axios';
export const fileUploadService = {

  fileUpload,
};
 
export function fileUpload(file)
{
  let data = new FormData();
  data.append('formFile', file);
  var url = `${apiUrl}${Master_gateway}users/upload`
  return axios.post(url, data, {
    headers: {
    'content-type': 'multipart/form-data',
    ...authHeader()
    }
    })
    .then(res => {
     return res
      
    })
    .catch(error => {
        return error
        })
         
}


  export default function* rootSaga() {
    yield all([
      fork(fileUpload),


    ]);
  }
  