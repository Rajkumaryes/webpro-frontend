import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {apiUrl,Export,currentUser,apiUrlExport} from '../../../constants/defaultValues'
import {authHeader,logout} from '../../../helpers/authheader';
import axios from 'axios';
export const ErrorService = {
  fetcherrormodule,
  createerrormodule,
  updateerrormodule,
  deleteerrormodule,
  fileUpload
};
  export function fetcherrormodule() {

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
  };
  return fetch(  `${apiUrlExport}${Export}errormodule`, requestOptions)
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
export function createerrormodule(user_id,shipment_no,mtd,invoice_no,customer_name,error_code_group,error_code,reason_code,recd_date,error_userid,receiver,error_des,remarks,start_time,end_time,updated_start_time,updated_end_time) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({user_id,shipment_no,mtd,invoice_no,customer_name,error_code_group,error_code,reason_code,recd_date,error_userid,receiver,error_des,remarks,start_time,end_time,updated_start_time,updated_end_time})
};
return fetch(  `${apiUrlExport}${Export}errormodule/create`, requestOptions)
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
export function updateerrormodule(id,date,shipment_no,mtd,invoice_no,customer_name,error_code_group,error_code,reason_code,recd_date,error_userid,receiver,error_des,remarks) {
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json',
        ...authHeader()
      },
    body: JSON.stringify({id,date,shipment_no,mtd,invoice_no,customer_name,error_code_group,error_code,reason_code,recd_date,error_userid,receiver,error_des,remarks})
};
return fetch(  `${apiUrlExport}${Export}errormodule/update/${id}`, requestOptions)
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

function deleteerrormodule(id) {
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
          ...authHeader()
        },
      body: JSON.stringify({ id })
  };
  return fetch(`${apiUrlExport}${Export}errormodule/delete/${id}`, requestOptions)
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
export function fileUpload(file,user_id)
{
  let data = new FormData();
  data.append('formFile', file);
  data.append('user_id', user_id);
  var url = `${apiUrlExport}${Export}errormodule/bulkupload`
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
      fork(fetcherrormodule),
      fork(createerrormodule),
     fork(updateerrormodule),
     fork(deleteerrormodule),
     fork(fileUpload),
    ]);
  }
  