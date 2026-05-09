import { all, fork } from 'redux-saga/effects';
import {apiUrl,KFR,Master_gateway} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';

export const kfrreportService = {
  fetchapi,
  fileUpload
};
  export function fetchapi(region_array,area_array,team_array,process_array,start_year,
    end_year,month_year_array,location,comparision,username,date_time) {

  
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
        body: JSON.stringify({region_array,area_array,team_array,process_array,start_year,
          month_year_array, end_year,location,comparision,username,date_time})
  };
  return fetch(  `${apiUrl}${Master_gateway}kfr/report`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function fileUpload(file,apiname)
{
  let data = new FormData();
  data.append('formFile', file);
  var url = `${apiUrl}${KFR}${apiname}/bulkupload`
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
,
    ]);
  }
  