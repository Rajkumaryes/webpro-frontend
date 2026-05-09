import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Master_gateway} from '../../../constants/defaultValues'
import {authHeader} from '../../../helpers/authheader';
import axios from 'axios';

export const WorkingdaysService = {
  filter,
  fetchData,
  createWorkingdays,
  updateData,
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
return fetch(  `${apiUrl}${Master_gateway}workingdays`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}  
  export function filter(page,per_page,region,area,team,process,month,year,location,isdoc,is_report,username,date_time) {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
        body: JSON.stringify({page,per_page,region,area,team,process,month,year,location,isdoc,is_report,username,date_time})
  };
  return fetch(  `${apiUrl}${Master_gateway}workingdays/filter`, requestOptions)
  .then(response => response.json())
  .then(user => { 
      return user;
      }) 
      .catch((error) => {
    }); 

}  
export function createWorkingdays(name,month,month_val,status) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({name,month,month_val,status})
};
return fetch(  `${apiUrl}${Master_gateway}Workingdays/create`, requestOptions)
.then(response => response.json())
.then(user => { 
    return user;
    }) 
    .catch((error) => {
  }); 

}
  
export function updateData(id,page,per_page,region,area,team,process,month,year,location,isdoc,value,username) {

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({page,per_page,region,area,team,process,month,year,location,isdoc,value,username})
};
return fetch(  `${apiUrl}${Master_gateway}workingdays/update/${id}`, requestOptions)
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
  return fetch(`${apiUrl}${Master_gateway}workingdays/delete/${id}`, requestOptions)
  .then(response => response.json())
  .then(user => {  
      return user;
      }) 
      .catch((error) => {
       
    });          
}
export function fileUpload(file,region,area,team,process,month,year,location,isdoc)
{
  let data = new FormData();
  data.append('formFile', file);
  data.append('region', region);
  data.append('area', area);
  data.append('team', team);
  data.append('process', process);
  data.append('month', month);
  data.append('year', year);
  data.append('location', location);
  data.append('isdoc', isdoc);
  var url = `${apiUrl}${Master_gateway}workingdays/bulkupload`
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
      fork(createWorkingdays),
     fork(updateData),
     fork(deleteapi),
  
    ]);
  }
  